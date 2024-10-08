import mongoose from "mongoose";
mongoose.set('strictQuery', false)

export default class ShipmentLocalMongo {
    constructor(collection, schema, urlDatabase) {
        console.log("CONTAINER SHIPMENT LOCAL CREADO");

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

    async getShipmentsLocal() {
        try {
            // console.log("getShipmentsLocal", await this.collection.find({}, { _id: 0, __v: 0 }).lean());
            return await this.collection.find({}, { _id: 0, __v: 0 }).lean();
        } catch (error) {
            console.log("desde container : getShipmentsLocal", error);
            throw error
        }
    }

    async getShipmentLocalByProvince (shipmentProvince) {
        return await this.collection.findOne({ province: shipmentProvince }, { _id: 0, __v: 0 }).lean()
    }

    async createShipmentLocal(shipmentLocalDto){
        try {
            const shipmentLocal = new this.collection(shipmentLocalDto)
            const savedShipmentLocal = await shipmentLocal.save(shipmentLocalDto)
            if(!savedShipmentLocal) throw { msg: "Error en BD al crear shipment local", status: 500 }
            const newShipmentLocal = await this.collection.findOne({ id: shipmentLocalDto.id }, { _id: 0, __v: 0 }).lean()
            return newShipmentLocal
        } catch (error) {
            console.log("error desde container : createShipmentLocal", error);
            throw error
        }
    }

    async getShipmentLocalById (id) {
        return await this.collection.findOne({ id }, { _id: 0, __v: 0 }).lean()
    }

    async deleteShipmentLocalById(id) {
        return await this.collection.deleteOne({ id: id });
    }

    async updateShipmentLocalById(id, data){
        const update = await this.collection.updateOne(
            { id: id},
            {
                $set: {
                    id: id,
                    province: data.province,
                    locality: data.locality,
                    postalCode: data.postalCode,
                    streetName: data.streetName,
                    streetNumber: data.streetNumber,
                    shipmentCost: data.shipmentCost
                }
            }
        )

        return await this.collection.findOne({ id: id }, { _id: 0, __v: 0 }).lean()
    }

    // CONTAINER API-STORE
    async getShipmentsLocalStore () {
        try {
            const shipmentsLocalStore = await this.collection.find({}, {_id: 0, __v:0}).lean()
            // console.log("Desde container : getShipmentsLocalStore", shipmentsLocalStore);
            return shipmentsLocalStore
        } catch (error) {
            console.log("Error desde container : getShipmentsLocalStore");
            throw error
        }
    }
}