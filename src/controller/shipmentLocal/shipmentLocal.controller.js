import { shipmentLocalServiceFactory } from "../../service/shipmentLocal/shipmentLocal.factory.js"

const createShipmentLocal = async (req, res) => {
    const dbname = req.subdomain
    try {
        const shipmentLocalService = await shipmentLocalServiceFactory(dbname)
        console.log("body shipmentLocal create", req.body);
        
        const shipshipmentLocal = await shipmentLocalService.createShipmentLocal(req.body, dbname)
        res.status(200).json({status: "ok", data: shipshipmentLocal});
    } catch (error) {
        res.status(500).json({status: "failed", data: error.msg})
    }
}

const getShipmentsLocal = async (req, res) => {
    const dbname = req.subdomain
    try {
        const shipmentLocalService = await shipmentLocalServiceFactory(dbname)
        const shipmentsLocal = await shipmentLocalService.getShipmentsLocal()
        res.status(200).json({ status: "ok", data: shipmentsLocal })
    } catch (error) {
        console.log("error desde controller : getShipmentsLocal", error);
        res.status(500).json({status: "failed", data: error.msg})
    }
}

const deleteShipmentLocalById = async (req, res) => {
    const dbname = req.subdomain
    try {
        const shipmentLocalService = await shipmentLocalServiceFactory(dbname)
        const deletedShipmentLocal = await shipmentLocalService.deleteShipmentLocalById(req.params.shipmentLocalId);
        res.status(200).json({status: "ok", data: deletedShipmentLocal});
    } catch (error) {
        console.log("desde deleteShipmentLocalById : controller", error );
        res.status(error.status).json({status: "failed", data: error.msg})
    }
}

const getShipmentLocalById = async (req, res) => {
    const dbname = req.subdomain
    try {
        const shipmentLocalService = await shipmentLocalServiceFactory(dbname)
        const shipmentLocal = await shipmentLocalService.getShipmentLocalById(req.params.shipmentLocalId);
        res.status(200).json({status: "ok", data: shipmentLocal});
    } catch (error) {
        console.log("desde getShipmentLocalById : controller", error );
        res.status(error.status).json({status: "failed", data: error.msg})
    }
}

const updateShipmentLocalById = async (req, res) => {
    console.log("body desde updateShipmentLocalById", req.body);
    
    const dbname = req.subdomain
    try {
        const shipmentLocalService = await shipmentLocalServiceFactory(dbname)
        const shipmentLocalUpdated = await shipmentLocalService.updateShipmentLocalById(req.params.shipmentLocalId, req.body);
        res.status(200).json({status: "ok", data: shipmentLocalUpdated});
    } catch (error) {
        console.log("desde updateShipmentLocalById : controller", error );
        res.status(error.status).json({status: "failed", data: error.msg})
    }
}

export {
    createShipmentLocal,
    getShipmentsLocal,
    deleteShipmentLocalById,
    getShipmentLocalById,
    updateShipmentLocalById
}