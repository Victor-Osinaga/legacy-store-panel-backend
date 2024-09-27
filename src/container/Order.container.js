import mongoose from "mongoose";
mongoose.set('strictQuery', false);

export default class OrderMongo{
    // constructor(collection, schema, url){
    //     mongoose.connect(url,{ 
    //         useUnifiedTopology: true,
    //         useNewUrlParser: true,
    //      });
    //     this.collection = mongoose.model(collection, schema);
    // }

    constructor(collection, schema, urlDatabase) {
        // console.log("CONTAINER ORDER CREADO");

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

    async getOrders(){
        try {
            return await this.collection.find({}, { _id: 0, __v: 0 }).lean();
        } catch (error) {
            console.log("desde container : getOrders", error);
            throw error
        }
    }

    async createOrder(orderDto) {
        try {
            const order = new this.collection(orderDto)
            const savedOrder = await order.save(orderDto)
            if(!savedOrder) throw {msg: "Error en BD al crear la ORDER", status: 500}
            return await this.collection.findOne({id : orderDto.id}, { _id: 0, __v: 0 }).lean();
        } catch (error) {
            console.log("desde container : createOrder", error);
            throw error
        }
    }

    async getOrderById(external_reference) {
        return await this.collection.findOne({ id: external_reference }, { _id: 0, __v: 0 }).lean();
    }

    async deleteOrderById(id) {
        const deletedOrder = await this.collection.deleteOne({ id: id }, { _id: 0, __v: 0 }).lean();
        console.log("desde container deletedOrder", deletedOrder);
        
        return deletedOrder
    }

    async putOrderStatusById(id, newOrder){
        const update = await this.collection.updateOne(
            {id: id},
            {
                $set: {
                    ...newOrder
                }
            }
        )
        return await this.collection.findOne({ id: id }, { _id: 0, __v: 0 }).lean();
    }

    async getOrderStatusById(orderId){
        return await this.collection.findOne({ id: orderId }, { _id: 0, __v: 0 }).lean();
    }
}