import { v4 as uuidv4 } from "uuid";
import { StoreConfiguration } from "../../model/storeConfiguration/model/StoreConfiguration.model.js";
import firebase from "firebase-admin";
import config from "../../../config.js";
import firebaseInitializer from "../../utils/firebase/initializeFirebase.js";
import getUrlBase from "../../utils/getUrlBase.js";
import { fileURLToPath } from "url";
import path from "path";
import { existsSync } from "fs"; // Para verificar si existe el archivo localmente

class StoreConfigurationService {
  constructor(repository) {
    this.storeConfigurationRepository = repository;
  }

  async createStoreConfiguration(body) {
    try {
      const existConfigName =
        await this.storeConfigurationRepository.repoGetStoreConfigurationByName(
          body.storeConfigName
        );
      console.log("existConfigName", existConfigName);

      if (existConfigName != null)
        throw {
          msg: "Ya existe una confiracion para tu tienda con este nombre",
          status: 400,
        };

      const { storeConfigName, primaryColorStore } = body;

      const configNoDto = new StoreConfiguration({
        id: uuidv4(),
        storeConfigName: body.storeConfigName,
        colors: {
          primaryColorStore: body.colors.primaryColorStore,
          secondaryColorStore: body.colors.secondaryColorStore,
          tertiaryColorStore: body.colors.tertiaryColorStore,
        },
        // primaryColorStore
      });

      const createdStoreConfig =
        await this.storeConfigurationRepository.repoCreateStoreConfiguration(
          configNoDto.convertToDTO()
        );

      return createdStoreConfig;
    } catch (error) {
      console.log("desde store configuration service", error);
      throw error;
    }
  }

  async getStoreConfiguration() {
    try {
      const existConfig =
        await this.storeConfigurationRepository.repoGetStoreConfiguration();

      // Obtener la ruta __dirname en módulos ES6
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      // Ruta del archivo local que quieres subir
      const localFilePath = path.join(
        __dirname,
        "../../../assets",
        "logolegacy.svg"
      ); // Nombre del archivo en Firebase Storage
      const storageFilePath = "logolegacy.svg";
      // Función para verificar si el archivo ya existe en Firebase Storage
      const bucket = firebaseInitializer.storage().bucket();
      const checkIfFileExistsInStorage = async (filePath) => {
        try {
          const file = bucket.file(filePath);
          const [exists] = await file.exists();
          return exists;
        } catch (error) {
          console.error(
            "Error al verificar la existencia del archivo en Firebase Storage:",
            error
          );
          return false;
        }
      };

      const fileExists = await checkIfFileExistsInStorage(storageFilePath);
      let logoLegacyUrlPublic;
      if (fileExists) {
        console.log("El archivo ya existe en Firebase Storage.");
        const fileLogoLegacy = bucket.file("logolegacy.svg");
        const [url] = await fileLogoLegacy.getSignedUrl({
          action: "read",
          expires: "03-09-2491",
        });
        const urlBase = getUrlBase(url);
        console.log("url", url);
        console.log("urlBase", urlBase);

        logoLegacyUrlPublic = urlBase;
      } else {
        console.log("El archivo no existe en Firebase Storage");
        if (!existsSync(localFilePath)) {
          console.log(
            "El archivo no existe en la ruta local especificada",
            localFilePath
          );
          return;
        } else {
          console.log("El archivo si existe en la ruta local especificada");
          // Subir el archivo si no existe en Firebase Storage
          await bucket.upload(localFilePath, {
            destination: storageFilePath,
            public: true,
          });
          console.log("Archivo subido exitosamente a Firebase Storage!");
          const fileLogoLegacy = bucket.file("logolegacy.svg");
          const [url] = await fileLogoLegacy.getSignedUrl({
            action: "read",
            expires: "03-09-2491",
          });
          const urlBase = getUrlBase(url);
          console.log("url", url);
          console.log("urlBase", urlBase);

          logoLegacyUrlPublic = urlBase;
        }
      }

      if (!existConfig) {
        const configNoDto = new StoreConfiguration({
          id: uuidv4(),
          storeConfigName: "Default",
          colors: {
            // primaryColorStore: "#1877f2",
            primaryColorStore: "#084c61",
            secondaryColorStore: "#2B2D38",
            tertiaryColorStore: "#23252F",
          },
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
        });

        const createdStoreConfig =
          await this.storeConfigurationRepository.repoCreateStoreConfiguration(
            configNoDto.convertToDTO()
          );
        return createdStoreConfig;
      } else {
        // console.log("DESDE getStoreConfiguration : SERVICES", existConfig);
        // console.log("existConfig.footerConfig", existConfig.footerConfig);

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
      }
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

      const createdStoreConfig =
        await this.storeConfigurationRepository.repoUpdateStoreConfiguration(
          existConfig.id,
          configNoDto.convertToDTO()
        );
      return createdStoreConfig;
    } catch (error) {
      console.log("desde store configuration service", error);
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
      console.log("desde store configuration service", error);
      throw error;
    }
  }
}

export { StoreConfigurationService };
