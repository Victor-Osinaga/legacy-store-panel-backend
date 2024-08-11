import { Router } from "express";
import verifyToken from "../../middlewares/verifyToken.js";
import verifySubdomain from "../../middlewares/verifySubdomain.js";
import * as storeConfigurationController from '../../controller/storeConfiguration/storeConfiguration.controller.js'



const v1StoreConfigurationRouter = new Router()
const v1StoreConfigurationRouterStore = new Router()

v1StoreConfigurationRouter.post( "/", verifyToken, storeConfigurationController.createStoreConfiguration )
v1StoreConfigurationRouter.get( "/", verifyToken, storeConfigurationController.getStoreConfiguration )
v1StoreConfigurationRouter.put( "/:id", verifyToken, storeConfigurationController.updateStoreConfiguration )

// ROUTER COFIGURATION STORE - STORE
v1StoreConfigurationRouterStore.post('/', verifySubdomain, storeConfigurationController.getStoreConfigurationStore)

export {
    v1StoreConfigurationRouter,
    v1StoreConfigurationRouterStore
}