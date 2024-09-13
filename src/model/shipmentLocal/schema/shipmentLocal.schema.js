import { Schema } from "mongoose";

const shipmentLocalSquema = new Schema({
    id: {
        type: String,
        required: [true, "required: id shipmentLocal: mongoose squema"]
    },
    province: {
        type: String,
        required: [true, "required: province shipmentLocal: monoose squema"]
    },
    locality: {
        type: String,
        required: [true, "required: locality shipmentLocal: monoose squema"]
    },
    postalCode: {
        type: String,
        required: [true, "required: postalCode shipmentLocal: monoose squema"]
    },
    streetName: {
        type: String,
        required: [true, "required: streetName shipmentLocal: monoose squema"]
    },
    streetNumber: {
        type: String,
        required: [true, "required: streetNumber shipmentLocal: monoose squema"]
    },
    shipmentCost: {
        type: Number,
        required: [true, "required: shipmentCost shipmentLocal: monoose squema"]
    },
    shipmentType: {
        type: String,
        required: [true, "required: shipmentType shipmentLocal: mongoose squema"]
    }

})

export {
    shipmentLocalSquema
}