import { Router } from "express";
import * as userController from "../../controller/user/user.controller.js";
import { isAdmin } from "../../middlewares/isAdmin.js";
import { isLogged } from "../../middlewares/isLogged.js";

const v1UserRouter = new Router()

// v1UserRouter.post('/', userController.createUser)
v1UserRouter.post('/', isLogged, isAdmin, userController.createUserAdmin)
v1UserRouter.get('/', isLogged, userController.getUserInfo)
v1UserRouter.post('/login', userController.verifyCredential)
export {
    v1UserRouter
}