import { Router } from "express";
import * as shipmentLocalController from "../../controller/shipmentLocal/shipmentLocal.controller.js"
import verifyTokenAdmin from "../../middlewares/verifyTokenAdmin.js";
import getClientDb from "../../middlewares/getClientDb.js";


const v1ShipmentLocalRouter = new Router()

v1ShipmentLocalRouter.post('/', verifyTokenAdmin, getClientDb, shipmentLocalController.createShipmentLocal)
v1ShipmentLocalRouter.get('/', verifyTokenAdmin, getClientDb, shipmentLocalController.getShipmentsLocal)

export {
    v1ShipmentLocalRouter
}