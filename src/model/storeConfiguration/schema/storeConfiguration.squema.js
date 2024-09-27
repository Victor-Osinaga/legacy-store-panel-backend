import { Schema } from "mongoose";

const colorsSchema = new Schema({
    primaryColorStore: {
        type: String,
        required: [true, "required: primaryColorStore : mongoose squema"]
    },
    secondaryColorStore: {
        type: String,
        required: [true, "required: secondaryColorStore : mongoose squema"]
    },
    tertiaryColorStore: {
        type: String,
        required: [true, "required: tertiaryColorStore : mongoose squema"]
    },
})

const storeConfigurationSchema = new Schema({
    id: {
        type: String,
        required: [true, "required: id product: mongoose squema"]
    },
    storeConfigName: {
        type: String, 
        required: [true, "required: storeConfigName : mongoose squema"]
    },
    colors: {
        type: colorsSchema, 
        required: [true, "required: colors : mongoose squema"],
        _id: false,
    },
})

export {
    storeConfigurationSchema
}