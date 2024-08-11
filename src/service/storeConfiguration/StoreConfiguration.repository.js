class StoreConfigurationRepository{
    constructor(dao){
        this.dao = dao
    }

    async repoCreateStoreConfiguration (storeConfig) {
        try {
            const createdStoreConfig = await this.dao.createStoreConfiguration(storeConfig)
            return createdStoreConfig
        } catch (error) {
            console.log("desde storeConfiguration createStoreConfiguration repository", error);
            throw error
        }
    }

    async repoGetStoreConfigurationByName (configName) {
        try {
            const configByName = await this.dao.getStoreConfigurationByName(configName)
            return configByName
        } catch (error) {
            console.log("desde storeConfiguration getConfirationByName repository", error);
            throw error
        }
    }

    async repoGetStoreConfiguration() {
        try {
            const configStore = await this.dao.getStoreConfiguration()
            return configStore
        } catch (error) {
            console.log("desde storeConfiguration repoGetStoreConfiguration repository", error);
            throw error
        }
    }

    async repoGetStoreConfigurationById(configId){
        try {
            const configStoreById = await this.dao.getStoreConfigurationById(configId)
            return configStoreById
        } catch (error) {
            console.log("desde storeConfiguration repoGetStoreConfigurationById repository", error);
            throw error
        }
    }

    async repoUpdateStoreConfiguration(configId, newData){
        try {
            const updatedConfig = await this.dao.updateStoreConfiguration(configId, newData)
            return updatedConfig
        } catch (error) {
            console.log("desde storeConfiguration repoUpdateStoreConfiguration repository", error);
            throw error
        }
    }

    // REPO API CONFIG STORE

    
    async repoGetStoreConfigurationStore() {
        try {
            const configStore = await this.dao.getStoreConfigurationStore()
            return configStore
        } catch (error) {
            console.log("desde storeConfiguration repoGetStoreConfiguration repository", error);
            throw error
        }
    }
}

export {
    StoreConfigurationRepository
}