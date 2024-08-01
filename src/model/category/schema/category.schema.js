import { Schema } from "mongoose"

const category = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true}
}, { _id: false })

const subCategory = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    categories: {
        type: [category], 
        validate: {
            validator: function(value){
                return value.length > 0;
            },
            message: 'Se requiere al menos una SubSub-Categoria'
        },
        required: true}
}, { _id: false })

const categorySchema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    subCategories: {
        type: [subCategory], 
        validate: {
            validator: function(value){
                return value.length > 0;
            },
            message: 'Se requiere al menos una Sub-Categoria'
        },
        required: true
    }
})

export {
    categorySchema
}