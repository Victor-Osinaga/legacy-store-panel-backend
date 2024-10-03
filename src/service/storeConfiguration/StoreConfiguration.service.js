import { v4 as uuidv4 } from 'uuid';
import { StoreConfiguration } from '../../model/storeConfiguration/model/StoreConfiguration.model.js';

class StoreConfigurationService {
    constructor(repository) {
        this.storeConfigurationRepository = repository
    }

    async createStoreConfiguration(body) {
        try {
            const existConfigName = await this.storeConfigurationRepository.repoGetStoreConfigurationByName(body.storeConfigName);
            console.log("existConfigName", existConfigName);

            if (existConfigName != null) throw { msg: "Ya existe una confiracion para tu tienda con este nombre", status: 400 }

            const { storeConfigName, primaryColorStore } = body

            const configNoDto = new StoreConfiguration({
                id: uuidv4(),
                storeConfigName: body.storeConfigName,
                colors: {
                    primaryColorStore: body.colors.primaryColorStore,
                    secondaryColorStore: body.colors.secondaryColorStore,
                    tertiaryColorStore: body.colors.tertiaryColorStore,
                }
                // primaryColorStore
            })

            const createdStoreConfig = await this.storeConfigurationRepository.repoCreateStoreConfiguration(configNoDto.convertToDTO())

            return createdStoreConfig;
        } catch (error) {
            console.log("desde store configuration service", error);
            throw error
        }
    }

    async getStoreConfiguration() {
        try {
            const existConfig = await this.storeConfigurationRepository.repoGetStoreConfiguration();
            // console.log("existConfig", existConfig);

            // if(existConfig != null) throw { msg: "Ya existe una confiracion para tu tienda con este nombre", status: 400 }
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
                            primaryColorFooter: "#2B2D38"
                        },
                        social: {
                            instagram: "https://www.instagram.com",
                            facebook: "https://www.facebook.com",
                            gmail: "test@test.com",
                            whatsapp: "5492966605314",
                            storeAddress: "Argentina - Salta - Av Siempre Viva 678"
                        }
                    }
                })

                const createdStoreConfig = await this.storeConfigurationRepository.repoCreateStoreConfiguration(configNoDto.convertToDTO())
                return createdStoreConfig
            } else {
                // console.log("DESDE getStoreConfiguration : SERVICES", existConfig);
                // console.log("existConfig.footerConfig", existConfig.footerConfig);
                
                if(!existConfig.footerConfig){
                    const newData = {
                        ...existConfig,
                        footerConfig: {
                            colors: {
                                primaryColorFooter: "#2B2D38"
                            },
                            social: {
                                instagram: "https://www.instagram.com",
                                facebook: "https://www.facebook.com",
                                gmail: "test@test.com",
                                whatsapp: "5492966605314",
                                storeAddress: "Argentina - Salta - Av Siempre Viva 678"
                            }
                        }
                    }

                    // console.log("NEW DATA", newData);
                    

                    const updatedConfig = await this.storeConfigurationRepository.repoUpdateStoreConfiguration(existConfig.id, newData)
                    return updatedConfig
                }
                return existConfig
            }
        } catch (error) {
            console.log("desde store configuration service", error);
            throw error
        }
    }

    async updateStoreConfiguration(idConfig, body) {
        try {
            const existConfig = await this.storeConfigurationRepository.repoGetStoreConfigurationById(idConfig);
            console.log("existConfigDesde updateStoreConfiguration", existConfig);

            if (!existConfig) throw { msg: "No existe una configuracion para tu tienda con ese id", status: 400 }

            const configNoDto = new StoreConfiguration({
                id: existConfig.id,
                storeConfigName: existConfig.storeConfigName,
                // colors: body.colors,
                ...body
            })

            const createdStoreConfig = await this.storeConfigurationRepository.repoUpdateStoreConfiguration(existConfig.id, configNoDto.convertToDTO())
            return createdStoreConfig

        } catch (error) {
            console.log("desde store configuration service", error);
            throw error
        }
    }

    // SERVICES CONFIG STORE
    async getStoreConfigurationStore() {
        try {
            const existConfig = await this.storeConfigurationRepository.repoGetStoreConfigurationStore();
            console.log("existConfig", existConfig);

            return existConfig
        } catch (error) {
            console.log("desde store configuration service", error);
            throw error
        }
    }
}

export {
    StoreConfigurationService
}