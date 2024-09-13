import { Router } from "express";
import * as shipmentLocalController from "../../controller/shipmentLocal/shipmentLocal.controller.js"
import verifyTokenAdmin from "../../middlewares/verifyTokenAdmin.js";
import getClientDb from "../../middlewares/getClientDb.js";
import verifySubdomain from "../../middlewares/verifySubdomain.js";


const v1ShipmentLocalRouter = new Router()
const v1ShipmentLocalRouterStore = new Router()

// ENDPOINTS API-PANEL
v1ShipmentLocalRouter.post('/', verifyTokenAdmin, getClientDb, shipmentLocalController.createShipmentLocal)
v1ShipmentLocalRouter.get('/', verifyTokenAdmin, getClientDb, shipmentLocalController.getShipmentsLocal)
v1ShipmentLocalRouter.delete('/:shipmentLocalId', verifyTokenAdmin, getClientDb, shipmentLocalController.deleteShipmentLocalById)
v1ShipmentLocalRouter.get('/:shipmentLocalId', verifyTokenAdmin, getClientDb, shipmentLocalController.getShipmentLocalById)
v1ShipmentLocalRouter.put('/:shipmentLocalId', verifyTokenAdmin, getClientDb, shipmentLocalController.updateShipmentLocalById)

// ENDPOINTS API-STORE
v1ShipmentLocalRouterStore.get("/", verifySubdomain, shipmentLocalController.getShipmentsLocalStore)

export {
    v1ShipmentLocalRouter,
    v1ShipmentLocalRouterStore
}