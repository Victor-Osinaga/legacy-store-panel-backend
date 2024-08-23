import { getShipmentLocalDao } from "../../dao/shipmentLocal/index.dao.js";
import { ShipmentLocalRepository } from "./ShipmentLocal.repository.js";
import { ShipmentLocalService } from "./ShipmentLocal.service.js";

async function shipmentLocalServiceFactory(dbname) {
    const shipmentLocalDao = await getShipmentLocalDao(dbname)
    const repository = new ShipmentLocalRepository(shipmentLocalDao)
    return new ShipmentLocalService(repository)
}

export {
    shipmentLocalServiceFactory
}