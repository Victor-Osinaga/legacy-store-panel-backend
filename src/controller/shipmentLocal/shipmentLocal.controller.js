import { shipmentLocalServiceFactory } from "../../service/shipmentLocal/shipmentLocal.factory.js"

const createShipmentLocal = async (req, res) => {
    const dbname = req.subdomain
    try {
        const shipmentLocalService = await shipmentLocalServiceFactory(dbname)
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

export {
    createShipmentLocal,
    getShipmentsLocal
}