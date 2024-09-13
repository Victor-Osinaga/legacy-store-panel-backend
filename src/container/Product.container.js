import mongoose from "mongoose";
mongoose.set('strictQuery', false);

export default class ProductMongo {
    // constructor(collection, schema, url) {
    //     console.log("desde contructor: ", url);
    //     mongoose.connect(url, {
    //         useUnifiedTopology: true,
    //         useNewUrlParser: true,
    //     });
    //     this.collection = mongoose.model(collection, schema);
    // }

    constructor(collection, schema, urlDatabase) {
        console.log("CONTAINER PRODUCT CREADO");

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

    async connect(url, db) {
        console.log("url", url);
        console.log("dbname", db);
        // console.log("this.connections", this.connections);

        const connectionIdentifier = `${url}${db}`;

        // Verifica si ya existe una conexión para el identificador dado
        if (this.connections[connectionIdentifier]) {
            const existingConnection = this.connections[connectionIdentifier];

            // Verifica si la conexión está abierta
            if (existingConnection.readyState === 1) {
                console.log('Reutilizando la conexión existente para:', connectionIdentifier);
                this.collection = existingConnection.model(this.collectionName, this.schema);
                // console.log("this.connections 11", this.connections);
                return;
            } else {
                console.log('Reconectando la conexión para:', connectionIdentifier);
                // console.log("this.connections 222", this.connections);
                existingConnection.close();
            }
        }

        // Si no existe una conexión, crear una nueva
        console.log('Estableciendo nueva conexión para:', connectionIdentifier);
        const newConnection = mongoose.createConnection(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            dbName: db,
        });

        // newConnection.on('connected', () => {
        //     console.log('Conexión a la base de datos establecida para:', connectionIdentifier);
        // });

        // newConnection.on('error', (error) => {
        //     console.error('Error en la conexión a la base de datos:', error);
        // });

        this.connections[connectionIdentifier] = newConnection;
        this.collection = newConnection.model(this.collectionName, this.schema);
        // console.log("this.connections 333", this.connections);
        // console.log("this.connections xddddddd", this.connections[connectionIdentifier].readyState);
        // console.log("this.connections longitudddd xddddddd", Object.keys(this.connections).length);
        // console.log("mongoose.ConnectionStates", mongoose.ConnectionStates);
    }


    async getProducts() {
        try {
            // console.log("P", await this.collection.find({}, { _id: 0, __v: 0 }).lean());
            return await this.collection.find({}, { _id: 0, __v: 0 }).lean();
        } catch (error) {
            console.log("desde container : getProducts", error);
            throw error
        }
    }

    async getProductByName(name) {
        return await this.collection.findOne({ name: name }, { _id: 0, __v: 0 }).lean();
    }

    async getProductById(id) {
        return await this.collection.findOne({ id: id }, { _id: 0, __v: 0 }).lean();
    }

    async deleteProductById(id) {
        return await this.collection.deleteOne({ id: id });
    }

    async updateProductById(id, newProduct) {
        const update = await this.collection.updateOne(
            { id: id },
            {
                $set: {
                    id: id,
                    name: newProduct.name,
                    description: newProduct.description,
                    price: newProduct.price,
                    image: newProduct.image,
                    categories: newProduct.categories,
                    sizes: newProduct.sizes,
                    weight: newProduct.weight,
                    timestamp: newProduct.timestamp
                },
            }
        );
        return await this.collection.findOne({ id: id }, { _id: 0, __v: 0 }).lean();
    }

    async createProduct(productDto) {
        try {
            const product = new this.collection(productDto)
            const savedProduct = await product.save(productDto)
            if (!savedProduct) throw { msg: "Error en BD al crear el producto", status: 500 }
            const newProduct = await this.collection.findOne({ id: productDto.id }, { _id: 0, __v: 0 }).lean();
            // console.log("DESDE CONTAINER", newProduct.categories);
            return newProduct
        } catch (error) {
            console.log("desde container : createProduct", error);
            throw error
        }
    }

    // CONTAINER API STORE

    // devuelve un array de objetos aunq tenga un solo objeto
    async getProductsStore() {
        try {
            // console.log("CONTAINER : getProductsStore", await this.collection.find({}, { _id: 0, __v: 0 }).lean());
            return await this.collection.find({}, { _id: 0, __v: 0 }).lean();
        } catch (error) {
            console.log("desde container : getProductsStore", error);
            throw error
        }
    }

    // devuelve un objeto
    async getProductStoreById(id) {
        try {
            console.log("getProductStoreById", await this.collection.findOne({id: id}, { _id: 0, __v: 0 }).lean());
            return await this.collection.findOne({id: id}, { _id: 0, __v: 0 }).lean();
        } catch (error) {
            console.log("desde container : getProductStoreById", error);
            throw error
        }
    }
}