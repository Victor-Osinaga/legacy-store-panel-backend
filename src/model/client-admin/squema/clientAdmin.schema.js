import { Schema } from "mongoose";

const clientAdminSquema = new Schema({
    id: {
        type: String,
        required: [true, "required: id client: mongoose squema"]
    },
    email: {
        type: String, 
        required: [true, "required: email client: mongoose squema"]
    },
    password: {
        type: String, 
        required: [true, "required: password client: mongoose squema"]
    },
    subdomain: {
        type: String, 
        required: [true, "required: subdomain client: mongoose squema"]
    },
    proyectName: {
        type: String, 
        required: [true, "required: proyectName client: mongoose squema"]
    },
    name: {
        type: String, 
        required: [true, "required: name client: mongoose squema"]
    },
    lastname: {
        type: String, 
        required: [true, "required: lastname client: mongoose squema"]
    },
})

export {
    clientAdminSquema
}