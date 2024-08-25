import { Router } from "express";
import * as shipmentDeliveryController from "../../controller/shipmentDelivery/shipmentDelivery.controller.js";
import verifyTokenAdmin from "../../middlewares/verifyTokenAdmin.js";
import getClientDb from "../../middlewares/getClientDb.js";


const v1ShipmentDeliveryRouter = new Router()

v1ShipmentDeliveryRouter.post("/", verifyTokenAdmin, getClientDb, shipmentDeliveryController.createShipmentDelivery)
v1ShipmentDeliveryRouter.get("/", verifyTokenAdmin, getClientDb, shipmentDeliveryController.getShipmentsDelivery)

export {
    v1ShipmentDeliveryRouter
}