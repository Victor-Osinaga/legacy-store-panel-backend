import { Router  } from "express";
import verifyToken from "../../middlewares/verifyToken.js";
import * as clientAdminController from '../../controller/client-admin/client-admin.controller.js'

const v1ClientAdminRouter = new Router()

v1ClientAdminRouter.post('/auth/register', clientAdminController.createClientAdmin)
// v1ClientRouter.get('/', clientController.getClients)
v1ClientAdminRouter.post('/auth/login', clientAdminController.loginClientAdmin)
v1ClientAdminRouter.post('/auth/logout', clientAdminController.logoutClientAdmin)
// v1ClientRouter.get('/auth/profile', verifyToken, clientController.getClientById)
// v1ClientRouter.post('/auth/verify-subdomain', clientController.verifySubdomain)
v1ClientAdminRouter.get('/auth/verify-token', verifyToken, clientAdminController.getClientAdminById)
export {
    v1ClientAdminRouter
}