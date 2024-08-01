import { Schema } from "mongoose";
import categorySchema from "./subSquemas/categorySquema.js";
import sizeSchema from "./subSquemas/sizeSchema.js";

const productSchema = new Schema({
    id: {
        type: String,
        required: [true, "required: id product: mongoose squema"]
    },
    name: {
        type: String, 
        required: [true, "required: name product: mongoose squema"]
    },
    description: {
        type: String, 
        required: [true, "required: description product: mongoose squema"]
    },
    price: {
        type: Number, 
        required: [true, "required: price product: mongoose squema"]
    },
    image: {
        type: String, 
        required: [true, "required: image product: mongoose squema"]
    },
    categories: {
        type: [categorySchema],
        required: [true, "required: categories product: mongoose squema"],
        validate: {
            validator: function (value){
                return value.length > 0;
            },
            message: 'validator: al menos una categoria: mongoose squema'
        },
        _id: false},
    sizes: {
        type: [sizeSchema],
        required: [true, "required: size product: mongoose squema"],
        validate: { 
            validator:  function(v) {
                return v.length > 0;
            },
            message: "validator: Al menons un size: mongoose squema"
        }
    },
    weight: {
        type: Number, 
        required: [true, "required: weight product: mongoose squema"],
    },
    timestamp: {
        type: String,
        required: [true, "required: timestamp product: mongoose squema"]
    }
})

export {
    productSchema
}