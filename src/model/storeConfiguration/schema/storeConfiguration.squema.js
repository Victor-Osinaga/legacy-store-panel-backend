import { Schema } from "mongoose";

const storeConfigurationSchema = new Schema({
    id: {
        type: String,
        required: [true, "required: id product: mongoose squema"]
    },
    storeConfigName: {
        type: String, 
        required: [true, "required: storeConfigName : mongoose squema"]
    },
    primaryColorStore: {
        type: String, 
        required: [true, "required: primaryColorStore : mongoose squema"]
    },
})

export {
    storeConfigurationSchema
}