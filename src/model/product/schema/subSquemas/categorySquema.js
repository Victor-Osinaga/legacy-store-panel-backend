import { Schema } from "mongoose";

const subCategorySquema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
}, { _id: false })

const categorySchema = new Schema({
    categoria: {type: subCategorySquema, required:true},
    subCategoria: {type: subCategorySquema, required:true},
    subSubCategoria: {type: subCategorySquema, required:true}
}, {_id: false})

export default categorySchema;