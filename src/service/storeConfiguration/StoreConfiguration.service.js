import { v4 as uuidv4 } from "uuid";
import { StoreConfiguration } from "../../model/storeConfiguration/model/StoreConfiguration.model.js";
import firebase from "firebase-admin";
import config from "../../../config.js";
import firebaseInitializer from "../../utils/firebase/initializeFirebase.js";
import getUrlBase from "../../utils/getUrlBase.js";
import { fileURLToPath } from "url";
import path from "path";
import { existsSync } from "fs"; // Para verificar si existe el archivo localmente
import {
  defaultConfigStore,
  defaultLogoDetails,
} from "../../utils/defaultConfigStore/defautlConfig.js";
import checkIfFileExistsInStorage from "../../utils/firebase/checkIfFileExistsInStorage.js";
import uploadLocalFileAndGetPublicUrl from "../../utils/firebase/uploadLocalFileAndGetPublicUrl.js";
import uploadLogo from "../../utils/firebase/uploadLogo.js";

class StoreConfigurationService {
  constructor(repository) {
    this.storeConfigurationRepository = repository;
  }

  async createDefaultStoreConfig() {
    try {
      const existConfigName =
        await this.storeConfigurationRepository.repoGetStoreConfigurationByName(
          defaultConfigStore.storeConfigName
        );
      console.log("existConfigName", existConfigName);

      if (existConfigName != null)
        throw {
          msg: "Ya existe una configuracion para tu tienda con este nombre",
          status: 400,
        };

      // const verify = async () => {
      const { filename } = defaultLogoDetails;
      // Obtener la ruta __dirname en módulos ES6
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      // Ruta del archivo local que quieres subir
      const localFilePath = path.join(__dirname, "../../../assets", filename); // Nombre del archivo en Firebase Storage

      const { exists, publicUrl } = await checkIfFileExistsInStorage(filename);
      let logoLegacyUrlPublic;
      if (!exists) {
        if (!existsSync(localFilePath)) {
          console.log(
            "El archivo no existe en la ruta local especificada",
            localFilePath
          );
          return;
        }
        console.log("El archivo si existe en la ruta local especificada");
        const { uploaded, publicUrl } = await uploadLocalFileAndGetPublicUrl(
          localFilePath,
          filename
        );
        if (!uploaded) {
          throw {
            msg: `No se pudo subir el archivo: ${filename}`,
            status: 500,
          };
        }

        logoLegacyUrlPublic = publicUrl;

        const configNoDto = new StoreConfiguration({
          ...defaultConfigStore,
          logoConfig: {
            logoUrl: logoLegacyUrlPublic,
          },
        });

        const createdStoreConfig =
          await this.storeConfigurationRepository.repoCreateStoreConfiguration(
            configNoDto.convertToDTO()
          );

        return createdStoreConfig;
      }
      // };

      // logoLegacyUrlPublic = publicUrl;
    } catch (error) {
      console.log("desde store configuration service", error);
      throw error;
    }
  }

  async getStoreConfiguration() {
    try {
      const existConfig =
        await this.storeConfigurationRepository.repoGetStoreConfiguration();

      if (!existConfig) {
        const createdConfig = await this.createDefaultStoreConfig();
        return createdConfig;
      }

      // TODO: REVISAR
      if (!existConfig.footerConfig || !existConfig.logoConfig) {
        const newData = {
          ...existConfig,
          footerConfig: {
            colors: {
              primaryColorFooter: "#000000",
            },
            social: {
              instagram: "https://www.instagram.com",
              facebook: "https://www.facebook.com",
              gmail: "test@test.com",
              whatsapp: "5492966605314",
              storeAddress: "Argentina - Salta - Av Siempre Viva 678",
            },
          },
          logoConfig: {
            logoUrl: logoLegacyUrlPublic,
          },
        };

        // console.log("NEW DATA", newData);

        const updatedConfig =
          await this.storeConfigurationRepository.repoUpdateStoreConfiguration(
            existConfig.id,
            newData
          );
        return updatedConfig;
      }
      return existConfig;
    } catch (error) {
      console.log("desde store configuration service", error);
      throw error;
    }
  }

  async updateStoreConfiguration(idConfig, body) {
    try {
      const existConfig =
        await this.storeConfigurationRepository.repoGetStoreConfigurationById(
          idConfig
        );
      console.log("existConfigDesde updateStoreConfiguration", existConfig);

      if (!existConfig)
        throw {
          msg: "No existe una configuracion para tu tienda con ese id",
          status: 400,
        };

      const configNoDto = new StoreConfiguration({
        id: existConfig.id,
        storeConfigName: existConfig.storeConfigName,
        // colors: body.colors,
        ...body,
      });

      const updatedConfig =
        await this.storeConfigurationRepository.repoUpdateStoreConfiguration(
          existConfig.id,
          configNoDto.convertToDTO()
        );
      return updatedConfig;
    } catch (error) {
      console.log("desde store configuration service", error);
      throw error;
    }
  }

  async updateLogoStoreConfig(req) {
    try {
      const getConfigStore =
        await this.storeConfigurationRepository.repoGetStoreConfiguration();
      console.log("getConfigStore: updateLogoStoreConfig", getConfigStore);

      const uploadAndGetUrl = await uploadLogo(
        req.processedLogo,
        `${uuidv4()}.webp`
      );

      const updatedConfigWithUrlLogo =
        await this.storeConfigurationRepository.repoUpdateLogoStoreConfig(
          getConfigStore.id,
          uploadAndGetUrl
        );

      console.log("updatedConfigWithUrlLogo: ", updatedConfigWithUrlLogo);

      return updatedConfigWithUrlLogo;
    } catch (error) {
      console.log(
        "desde store configuration service: updateLogoStoreConfig",
        error
      );
      throw error;
    }
  }

  // SERVICES CONFIG STORE
  async getStoreConfigurationStore() {
    try {
      const existConfig =
        await this.storeConfigurationRepository.repoGetStoreConfigurationStore();
      console.log("existConfig", existConfig);

      return existConfig;
    } catch (error) {
      console.log(
        "desde store configuration service: getStoreConfigurationStore",
        error
      );
      throw error;
    }
  }
}

export { StoreConfigurationService };
