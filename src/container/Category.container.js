import mongoose from "mongoose";
mongoose.set('strictQuery', false);

export default class CategoryMongo{
    constructor(collection, schema, url){
        mongoose.connect(url,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        this.collection = mongoose.model(collection, schema);
    }

    async getCategories() {
        return await this.collection.find({}, { _id: 0, __v: 0 }).lean();
    }

    async getUncategorized(uncategorizedName){
        return await this.collection.find({name: uncategorizedName}, { _id: 0, __v: 0}).lean();
    }

    async getCategoryByName(name) {
        return await this.collection.findOne({name: name}, { _id: 0, __v: 0 }).lean();
    }

    async getCategoryById(id) {
        return await this.collection.findOne({ id: id }, { _id: 0, __v: 0 }).lean();
    }

    async deleteCategoryById(id) {
        const res = await this.collection.deleteOne({ id: id });
        console.log("desde deletecategorybyid contaienr", res);
        return res
    }

    async getCategoryByName(name){
        return await this.collection.findOne({ name: name }, { _id: 0, __v: 0 }).lean();
    }

    async updateCategoryById(id, newCategory){
        try {
            const update = await this.collection.updateOne(
                { id: id },
                {
                  $set: {
                    id: id,
                    name: newCategory.name,
                    subCategories: newCategory.subCategories,
                  },
                }
              );
              console.log("ASD",update);
              if(update.modifiedCount > 0 && update.matchedCount > 0){
                return await this.collection.findOne({ id: id }, { _id: 0, __v: 0 }).lean();
              }else if(update.matchedCount > 0 && update.modifiedCount == 0){
                throw {msg: "NO modificaste nada en la categoria", status: 400}
              }else if(update.matchedCount == 0){
                throw {msg: "NO SE PUDO ACTUALIZAR LA CATEGORIA PORQUE NO HAY ALGUNA CON ESE ID", status: 400}
              }
        } catch (error) {
            console.log("DESDE CONTAINER", error);
            throw error
        }
          
    }

    async createCategory(categoryDto) {
        try {
            const category = new this.collection(categoryDto)
            const savedCategory = await category.save()
            if(!savedCategory) throw {msg: "Error en BD al crear la categoria", status: 500}
            return await this.collection.findOne({id : savedCategory.id}, { _id: 0, __v: 0 }).lean();
        } catch (error) {
            throw error
        }
    }
}