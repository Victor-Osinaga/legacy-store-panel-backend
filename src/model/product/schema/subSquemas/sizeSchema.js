import { Schema } from "mongoose";
import colorSchema from "./colorSchema.js";
import { v4 as uuidv4 } from 'uuid';

const sizeSchema = new Schema({
    id: {
        type: String,
        required: [true, "requeired: id size: mongoose squema"]
    },
    name: {
        type: String,
        required: [true, "required: name size : mongoose squema"]
    },
    colors: {
        type: [colorSchema],
        required: [true, "required: color: mongoose squema"],
        validate: {
            validator: function (v) {
                return v.length > 0;
            },
            message: "validator: Al menos un color: mongoose squema"
        }
    },
    _id: false
})

sizeSchema.pre('validate', function (next) {
    this.id = uuidv4();
    next();
});

export default sizeSchema;