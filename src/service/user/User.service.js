import { v4 as uuidv4 } from 'uuid';
import bcryptjs from 'bcryptjs';
import { genAuthToken } from '../../utils/jwt/genAuthToken.js.js';
// data.password = await bcryptjs.hash(data.password, 8)
import {User} from '../../model/user/model/User.model.js'
import { decodificar } from '../../utils/jwt/decodificar.js';

class UserService{
    constructor(repository){
        this.userRepository = repository
    }

    async getUserById(id){
        try {
            const userById = await this.userRepository.repoGetUserById(id)
            if (!userById) throw {msg: "ID INVALIDO", status: 400}
            return userById
        } catch (error) {
            throw error
            console.log("desde user service",error);
        }
    }

    async createUser(body){
        try {
            console.log("body", body);
            const { admin, ...newBody } = body;
            const newUserNoDto = new User({
                id: uuidv4(),
                admin: false,
                ...newBody,
            })
            console.log("new user", newUserNoDto.convertToDTO());

            const userByEmail = await this.userRepository.repoGetUserByEmail(newUserNoDto.getEmail())
            if(userByEmail != null) throw {msg: "Email ya registrado como admin", status: 400}

            newUserNoDto.setPassword(await bcryptjs.hash(newUserNoDto.getPassword(), 8))

            const registeredUserNoDto = await this.userRepository.repoCreateUser(newUserNoDto.convertToDTO())
            return registeredUserNoDto
            // const newUser = new User(registeredUserNoDto)
            // return newUser.convertToDTO()
        } catch (error) {
            console.log("desde user service",error);
            throw error
        }
    }

    async createUserAdmin(body){
        try {
            console.log("body", body);
            const { admin, id, ...newBody } = body;
            const newUserAdminNoDto = new User({
                id: uuidv4(),
                admin: true,
                ...newBody,
            })

            const userByEmail = await this.userRepository.repoGetUserByEmail(newUserAdminNoDto.getEmail())
            if(userByEmail != null) throw {msg: "Email ya registrado", status: 400}

            newUserAdminNoDto.setPassword(await bcryptjs.hash(newUserAdminNoDto.getPassword(), 8))

            const registeredUserNoDto = await this.userRepository.repoCreateUser(newUserAdminNoDto.convertToDTO())
            console.log("new user ADMIN", registeredUserNoDto);
            return registeredUserNoDto
            // const newUser = new User(registeredUserNoDto)
            // return newUser.convertToDTO()
        } catch (error) {
            console.log("desde user service",error);
            throw error
        }
    }

    async verifyCredential(body){
        try {
            if(!body?.email) throw {msg: "EMAIL es requerida"}
            if(!body?.password) throw {msg: "PASSWORD es requerida"}

            const userByEmail = await this.userRepository.repoGetUserByEmail(body.email)
            if(!userByEmail) throw {msg: "No existe un usuario con ese Email"}

            // console.log("usuario por email",userByEmail);
            // console.log(pwd);
            if(await bcryptjs.compare(body.password, userByEmail.password)){
                const obj = {
                    access_token: await genAuthToken(userByEmail.id),
                    // email: userByEmail.email,
                    // name: userByEmail.name,
                    // lastname: userByEmail.lastname,
                    // image: userByEmail.image
                }
                return obj
            }else{
                console.log("contraseña incorrecta")
                throw {msg: "Contraseña incorrecta"}
            }
        } catch (error) {
            console.log("desde login service", error);
            throw error
        }
    }
    
}

export{
    UserService
}