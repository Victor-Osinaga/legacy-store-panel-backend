import mongoose from "mongoose";
mongoose.set('strictQuery', false);

export default class StoreConfigurationMongo {
    constructor(collection, schema, urlDatabase) {
        console.log("CONTAINER STORE CONFIGURATION CREADO");

        const newConnection = mongoose.createConnection(urlDatabase, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            // dbName: dbname,
        });
        this.collectionName = collection;
        this.schema = schema;
        this.connections = {}; // Almacena conexiones de base de datos por URL o identificador
        this.collection = newConnection.model(this.collectionName, this.schema);
    }

    async createStoreConfiguration(storeConfigDto) {
        try {
            const storeConfig = new this.collection(storeConfigDto)
            const savedStoreConfig = await storeConfig.save(storeConfigDto)
            if (!savedStoreConfig) throw { msg: "Error en BD al crear la store configuration", status: 500 }
            const newStoreConfig = await this.collection.findOne({ id: storeConfigDto.id }, { _id: 0, __v: 0 }).lean();
            console.log("newStoreConfig", newStoreConfig);


            return newStoreConfig
        } catch (error) {
            console.log("error desde container createStoreConfiguration: ", error);

            throw error
        }
    }

    async getStoreConfigurationByName(storeConfigName) {
        try {
            const configByName = await this.collection.findOne({ storeConfigName: storeConfigName }, { _id: 0, __v: 0 }).lean();
            console.log("desde container configByName: ", configByName);

            return configByName
        } catch (error) {
            console.log("error desde container storeConfiguration", error);
            throw error
        }
    }

    async getStoreConfiguration() {
        try {
            const configStore = await this.collection.findOne({}, { _id: 0, __v: 0 }).lean();
            console.log("desde container getStoreConfiguration: ", configStore);

            return configStore
        } catch (error) {
            console.log("error desde container getStoreConfiguration", error);
            throw error
        }
    }

    async getStoreConfigurationById(configId) {
        return await this.collection.findOne({ id: configId }, { _id: 0, __v: 0 }).lean();
    }

    async updateStoreConfiguration(idConfig, newData) {
        const update = await this.collection.updateOne(
            { id: idConfig },
            {
                $set: {
                    id: idConfig,
                    storeConfigName: newData.storeConfigName,
                    primaryColorStore: newData.primaryColorStore
                },
            }
        );
        return await this.collection.findOne({ id: idConfig }, { _id: 0, __v: 0 }).lean();
    }

    // API CONTAINER CONFIG STORE
    
    async getStoreConfigurationStore() {
        try {
            const configStore = await this.collection.findOne({}, { _id: 0, __v: 0 }).lean();
            console.log("desde container getStoreConfiguration: ", configStore);

            return configStore
        } catch (error) {
            console.log("error desde container getStoreConfiguration", error);
            throw error
        }
    }
}

