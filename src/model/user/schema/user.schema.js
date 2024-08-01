import { Schema } from "mongoose"

const userSchema = new Schema({
    id: {type: String},
    email: {type: String, required: true/*, max: 10*/},
    password: {type: String, required: true},
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    admin: {type: Boolean, required: true}/*,
    image: {type: String, required: true}*/
})

export {
    userSchema
}