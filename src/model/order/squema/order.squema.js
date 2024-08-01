import { Schema } from "mongoose"

const orderSchema = new Schema({
    id: {type: String, required: true},
    paymentId: {type: Number, required: true},
    tipoDePago: {type: String, required: true/*, max: 10*/},
    metodoDePago: {type: String, required: true/*, max: 10*/},
    costoEnvio: {type: Number, required: true},
    totalDeCompra: {type: Number, required: true},
    totalConEnvio: {type: Number, required: true},
    netoRecibido: {type: Number, required: true},
    comisionMp: {type: Number, required: true},
    cuotas: {type: Number, required: true},
    fechaDeLiberacion: {type: String, required: true},
    timestamp: {type: String, required: true},
    // tipoEnvio: {type: String, required: true},
    direccionEnvio: {type: Object, required: true},
    payer: {type: Object, required: true},
    products: {type: Array, required: true},
    status: {type: String, required: true},
})

export {
    orderSchema
}