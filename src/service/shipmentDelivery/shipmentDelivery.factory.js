import { getShipmentDeliveryDao } from "../../dao/shipmentDelivery/index.dao.js";
import { ShipmentDeliveryRepository } from "./ShipmentDelivery.repository.js";
import { ShipmentDeliveryService } from "./ShipmentDelivery.service.js";

async function shipmentDeliveryServiceFactory(dbName) {
    const shipmentDeliveryDao = await getShipmentDeliveryDao(dbName);
    const repository = new ShipmentDeliveryRepository(shipmentDeliveryDao);
    return new ShipmentDeliveryService(repository)
}

export {
    shipmentDeliveryServiceFactory
}