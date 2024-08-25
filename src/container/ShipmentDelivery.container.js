import mongoose from "mongoose";

export default class ShipmentDeliveryMongo {
    constructor(collection, schema, urlDatabase){
        console.log("CONTAINER SHIPMENT DELIVERY CREADO");
        
        const newConnection = mongoose.createConnection(urlDatabase, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })

        this.collection = newConnection.model(collection, schema);
    }

    async createShipmentDelivery(data){
        try {
            const shipmentDelivery = new this.collection(data)
            const savedShipmentDelivery = await shipmentDelivery.save(data)

            if(!savedShipmentDelivery) throw { msg: "Error en BD al crear SHIPMENT DELIVERY", status: 599 }

            const newShipmentDelivery = await this.collection.findOne({ id: data.id }, { _id: 0, __v: 0 }).lean()
            return newShipmentDelivery
        } catch (error) {
            console.log("error desde ShipmentDeliveryMongo : createShipmentDelivery", error);
            throw error
        }
    }

    async getShipmentsDelivery () {
        try {
            return await this.collection.find({}, { _id: 0, __v: 0 }).lean();
        } catch (error) {
            console.log("desde container : getShipmentsDelivery", error);
            throw error
        }
    }
}