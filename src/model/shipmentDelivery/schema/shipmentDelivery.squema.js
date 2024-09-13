import { Schema } from "mongoose";

const shipmentDeliverySchema = new Schema({
    id: {
        type: String,
        required: [true, "required: id shipmentDelivery: mongoose squema"]
    },
    province: {
        type: String,
        required: [true, "required: province shipmentDelivery: mongoose squema"]
    },
    shipmentCost: {
        type: Number,
        required: [true, "required: shipmentCost shipmentDelivery: mongoose squema"]
    },
    shipmentType: {
        type: String,
        required: [true, "required: shipmentType shipmentDelivery: mongoose squema"]
    }
})

export {
    shipmentDeliverySchema
}