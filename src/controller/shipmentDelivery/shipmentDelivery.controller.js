import { shipmentDeliveryServiceFactory } from "../../service/shipmentDelivery/shipmentDelivery.factory.js";

const createShipmentDelivery = async (req, res) => {
    const dbname = req.subdomain
    try {
        const shipmentDeliveryService = await shipmentDeliveryServiceFactory(dbname)
        console.log("body shipmentDelivery create", req.body);
        
        const createdShipmentDelivery = await shipmentDeliveryService.createShipmentDelivery(req.body)
        res.status(200).json({status: "ok", data: createdShipmentDelivery})
    } catch (error) {
        console.log("error desde controller : createShipmentDelivery", error);
        res.status(500).json({ status: "failed", data: error.msg })
    }
}

const getShipmentsDelivery = async (req, res) => {
    const dbname = req.subdomain
    try {
        const shipmentDeliveryService = await shipmentDeliveryServiceFactory(dbname)
        const shipmentsDelivery = await shipmentDeliveryService.getShipmentsDelivery()
        res.status(200).json({ status: "ok", data: shipmentsDelivery })
    } catch (error) {
        console.log("error desde controller : getShipmentsDelivery", error);
        res.status(500).json({status: "failed", data: error.msg})
    }
}

export {
    createShipmentDelivery,
    getShipmentsDelivery
}