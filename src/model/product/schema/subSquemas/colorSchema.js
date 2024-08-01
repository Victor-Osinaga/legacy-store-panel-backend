import { Schema } from "mongoose"
import { v4 as uuidv4 } from 'uuid';

const colorSchema = new Schema({
    id: {
        type: String,
        required: [true, "required: id color: mongoose squema"]
    },
    name: {
        type: String,
        required: [true, "required: name color: mongoose squema"]
    },
    value: {
        type: String,
        required: [true, "required: value color: mongoose squema"]
    },
    stock: {
        type: Number,
        required: [true, "required: stock color: mongoose squema"],
        min: [0, "min: stock no puede ser negativo: mongoose squema"]
    },
    _id: false
})

// Middleware para asegurar que siempre se genere un UUID para el campo 'id'
colorSchema.pre('validate', function (next) {
    this.id = uuidv4();
    next();
});

export default colorSchema