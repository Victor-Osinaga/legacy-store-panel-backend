import { shipmentDeliveryServiceFactory } from "../../service/shipmentDelivery/shipmentDelivery.factory.js";

// CONTROLLERS API-PANEL
const createShipmentDelivery = async (req, res) => {
    const dbname = req.proyectName
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
    const dbname = req.proyectName
    try {
        const shipmentDeliveryService = await shipmentDeliveryServiceFactory(dbname)
        const shipmentsDelivery = await shipmentDeliveryService.getShipmentsDelivery()
        res.status(200).json({ status: "ok", data: shipmentsDelivery })
    } catch (error) {
        console.log("error desde controller : getShipmentsDelivery", error);
        res.status(500).json({status: "failed", data: error.msg})
    }
}

const deleteShipmentDeliveryById = async (req, res) => {
    const dbname = req.proyectName;
    try {
        const shipmentDeliveryService = await shipmentDeliveryServiceFactory(dbname)
        const deletedShipmentDelivery = await shipmentDeliveryService.deleteShipmentDeliveryById(req.params.shipmentDeliveryId)
        res.status(200).json({status: "ok", data: deletedShipmentDelivery})
    } catch (error) {
        console.log("error desde controller : deleteShipmentDeliveryById", error);
        res.status(500).json({status: "failed", data: error.msg})
    }
}

const updateShipmentDeliveryById = async (req, res) => {
    console.log("body desde updateShipmentDeliveryById", req.body);
    
    const dbname = req.proyectName
    try {
        const shipmentDeliveryService = await shipmentDeliveryServiceFactory(dbname)
        const updatedShipmentDelivery = await shipmentDeliveryService.updateShipmentDeliveryById(req.parans.shipmentDeliveryId, req.body)
        res.status(200).json({ status: "ok", data: updatedShipmentDelivery })
    } catch (error) {
        console.log("error desde controller : updateShipmentDeliveryById", error);
        res.status(500).json({status: "failed", data: error.msg})
    }
}

// CONTROLLERS API-STORE
const getShipmentsDeliveryStore = async(req, res) => {
    const dbname = req.proyectName
    try {
        const shipmentDeliveryService = await shipmentDeliveryServiceFactory(dbname)
        const shipmentsDelivery = await shipmentDeliveryService.getShipmentsDeliveryStore()
        res.status(200).json({status: "ok", data: shipmentsDelivery})
    } catch (error) {
        console.log("desde getShipmentsDeliveryStore : controller", error );
        res.status(error.status).json({status: "failed", data: error.msg})
    }
}

export {
    createShipmentDelivery,
    getShipmentsDelivery,
    deleteShipmentDeliveryById,
    updateShipmentDeliveryById,
    getShipmentsDeliveryStore
}