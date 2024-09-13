import { Router } from "express";
import * as shipmentDeliveryController from "../../controller/shipmentDelivery/shipmentDelivery.controller.js";
import verifyTokenAdmin from "../../middlewares/verifyTokenAdmin.js";
import getClientDb from "../../middlewares/getClientDb.js";
import verifySubdomain from "../../middlewares/verifySubdomain.js";


const v1ShipmentDeliveryRouter = new Router()
const v1ShipmentDeliveryRouterStore = new Router()

// EMDPOINTS API-PANEL
v1ShipmentDeliveryRouter.post("/", verifyTokenAdmin, getClientDb, shipmentDeliveryController.createShipmentDelivery)
v1ShipmentDeliveryRouter.get("/", verifyTokenAdmin, getClientDb, shipmentDeliveryController.getShipmentsDelivery)
v1ShipmentDeliveryRouter.delete("/:shipmentDeliveryId", verifyTokenAdmin, getClientDb, shipmentDeliveryController.deleteShipmentDeliveryById)
v1ShipmentDeliveryRouter.put("/:shipmentDeliveryId", verifyTokenAdmin, getClientDb, shipmentDeliveryController.updateShipmentDeliveryById)

// ENDPOINTS API-STORE
v1ShipmentDeliveryRouterStore.get("/", verifySubdomain, shipmentDeliveryController.getShipmentsDeliveryStore)
export {
    v1ShipmentDeliveryRouter,
    v1ShipmentDeliveryRouterStore
}