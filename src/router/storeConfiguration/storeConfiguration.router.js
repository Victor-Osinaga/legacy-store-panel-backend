import { Router } from "express";
import verifyToken from "../../middlewares/verifyToken.js";
import verifySubdomain from "../../middlewares/verifySubdomain.js";
import * as storeConfigurationController from '../../controller/storeConfiguration/storeConfiguration.controller.js'
import verifyTokenAdmin from "../../middlewares/verifyTokenAdmin.js";
import getClientDb from "../../middlewares/getClientDb.js";



const v1StoreConfigurationRouter = new Router()
const v1StoreConfigurationRouterStore = new Router()

// v1StoreConfigurationRouter.post( "/", verifyTokenAdmin, getClientDb, storeConfigurationController.createStoreConfiguration )
v1StoreConfigurationRouter.get( "/", verifyTokenAdmin, getClientDb, storeConfigurationController.getStoreConfiguration )
v1StoreConfigurationRouter.put( "/:id", verifyTokenAdmin, getClientDb, storeConfigurationController.updateStoreConfiguration )

// ROUTER COFIGURATION STORE - STORE
v1StoreConfigurationRouterStore.post('/', verifySubdomain, storeConfigurationController.getStoreConfigurationStore)

export {
    v1StoreConfigurationRouter,
    v1StoreConfigurationRouterStore
}