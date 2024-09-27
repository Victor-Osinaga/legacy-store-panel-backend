import { Schema } from "mongoose"

const productOrderSchema = new Schema({
    id: {
        type: String,
        required: [true, "required: id productOrderSchema: mongoose squema"],
    },
    image: {
        type: String,
        required: [true, "required: image productOrderSchema: mongoose squema"],
    },
    name: {
        type: String,
        required: [true, "required: name productOrderSchema: mongoose squema"],
    },
    price: {
        type: Number,
        required: [true, "required: price productOrderSchema: mongoose squema"],
    },
    quantity: {
        type: Number,
        required: [true, "required: quantity productOrderSchema: mongoose squema"],
        min: 1
    },
    selected_color_id: {
        type: String,
        required: [true, "required: selected_color_id productOrderSchema: mongoose squema"]
    },
    selected_color_name: {
        type: String,
        required: [true, "required: selected_color_name productOrderSchema: mongoose squema"]
    },
    selected_size_id: {
        type: String,
        required: [true, "required: selected_size_id productOrderSchema: mongoose squema"]
    },
    selected_size_name: {
        type: String,
        required: [true, "required: selected_size_name productOrderSchema: mongoose squema"]
    },
    timestamp: {
        type: String,
        required: [true, "required: timestamp productOrderSchema: mongoose squema"]
    },
});

const shipmentInfoSchema = new Schema({
    id: {
        type: String,
        required: [true, "required: id shipmentInfoSchema: mongoose squema"]
    },
    locality: {
        type: String,
        required: [true, "required: locality shipmentInfoSchema: mongoose squema"]
    },
    postal_code: {
        type: String,
        required: [true, "required: postal_code shipmentInfoSchema: mongoose squema"]
    },
    province: {
        type: String,
        required: [true, "required: province shipmentInfoSchema: mongoose squema"]
    },
    shipment_cost: {
        type: Number,
        required: [true, "required: shipment_cost shipmentInfoSchema: mongoose squema"],
        min: 0
    },
    shipment_type: {
        type: String,
        required: [true, "required: shipment_type shipmentInfoSchema: mongoose squema"],
        enum: ['shipment_local', 'shipment_delivery']
    },
    street_name: {
        type: String,
        required: [true, "required: street_name shipmentInfoSchema: mongoose squema"]
    },
    street_number: {
        type: String,
        required: [true, "required: street_number shipmentInfoSchema: mongoose squema"]
    },
});

const clientContactInfoSquema = new Schema({
    email: {
        type: String,
        required: [true, "required: email clientContactInfoSquema: mongoose squema"],
        match: /^\S+@\S+\.\S+$/
    },
    name: {
        type: String,
        required: [true, "required: name clientContactInfoSquema: mongoose squema"],
    },
    surname: {
        type: String,
        required: [true, "required: surname clientContactInfoSquema: mongoose squema"],
    },
    phone: {
        area_code: {
            type: String,
            required: [true, "required: area_code clientContactInfoSquema: mongoose squema"],
        },
        number: {
            type: Number,
            required: [true, "required: number clientContactInfoSquema: mongoose squema"],
        }
    },
})

const orderSchema = new Schema({
    id: {
        type: String,
        required: [true, "required: id order: mongoose squema"]
    },
    payment_id: {
        type: String,
        required: [true, "required: payment_id order: mongoose squema"]
    },
    shipment_cost: {
        type: Number,
        required: [true, "required: shipment_cost order: mongoose squema"]
    },
    total_paid_amount: {
        type: Number,
        required: [true, "required: total_paid_amount order: mongoose squema"]
    },
    net_received_amount: {
        type: Number,
        required: [true, "required: net_received_amount order: mongoose squema"]
    },
    payment_type: {
        type: String,
        required: [true, "required: payment_type order: mongoose squema"]
    },
    installments: {
        type: Number,
        required: [true, "required: installments order: mongoose squema"]
    },
    money_release_date: {
        type: String,
        required: [true, "required: money_release_date order: mongoose squema"]
    },
    timestamp: {
        type: String,
        required: [true, "required: timestamp order: mongoose squema"]
    },
    order_status: {
        type: String,
        required: [true, "required: order_status order: mongoose squema"],
        enum: ["pendiente", "procesado", "listo", "enviado/retirado"]
    },
    products: {
        type: [productOrderSchema],
        required: true,
        validate: {
            validator: function (products) {
                return products.length > 0;
            },
            message: "Debe haber al menos un producto"
        },
        _id: false
    },
    shipment_info: {
        type: shipmentInfoSchema,
        required: [true, "required: shipment_info order: mongoose squema"],
        _id: false
    },
    client_info_contact: {
        type: clientContactInfoSquema,
        required: [true, "required: client_info_contact order: mongoose squema"],
        _id: false
    }
})

export {
    orderSchema
}