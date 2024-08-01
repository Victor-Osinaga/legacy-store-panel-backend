// import mongoose from "mongoose";
// mongoose.set('strictQuery', false);

// export default class UserMongo{
//     constructor(collection, schema, url){
//         mongoose.connect(url,{ 
//             useUnifiedTopology: true,
//             useNewUrlParser: true, 
//         });
//         this.collection = mongoose.model(collection, schema);
//     }

//     async getUserByEmail(email) {
//         // findOne devuelve "null" si no encuentra
//         const result = await this.collection.findOne({email: email}, { _id: 0, __v: 0 }).lean();
//         console.log("result getUserByEmail desde User.container", result);
//         return result
//     }

//     async getUserById(id) {
//         return await this.collection.findOne({id: id}, { _id: 0, __v: 0, password: 0 }).lean();
//     }

//     async createUser(userDto){
//         try {
//             const newUser = new this.collection(userDto)
//             const savedUser = await newUser.save()
//             if(!savedUser) throw {msg: "Error en BD al crear el usuario", status: 500}
//             return await this.collection.findOne({id : userDto.id}, { _id: 0, __v: 0, password: 0 }).lean();
//         } catch (error) {
//             throw error
//         }
//     }
// }