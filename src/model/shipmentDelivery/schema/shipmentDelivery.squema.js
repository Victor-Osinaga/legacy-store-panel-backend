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
    shipingCost: {
        type: Number,
        required: [true, "required: shipingCost shipmentDelivery: mongoose squema"]
    }
})

export {
    shipmentDeliverySchema
}