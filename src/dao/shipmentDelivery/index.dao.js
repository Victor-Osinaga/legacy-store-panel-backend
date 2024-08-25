import config from "../../../config.js";
import { shipmentDeliverySchema } from "../../model/shipmentDelivery/schema/shipmentDelivery.squema.js";

async function getShipmentDeliveryDao(dbname){
    let shipmentDeliveryDao;

    if(config.env == "dev"){
        const { default: ShipmentDeliveryDevDAO } = await import('./ShipmentDeliveryDev.dao.js')
        shipmentDeliveryDao = new ShipmentDeliveryDevDAO('shipmentDeliverys', shipmentDeliverySchema, `${config.dev_url}${dbname}`)
    }else{
        const { default: ShipmentDeliveryProdDAO } = await import('./ShipmentDeliveryProd.dao.js')
        shipmentDeliveryDao = new ShipmentDeliveryProdDAO('shipmentDeliverys', shipmentDeliverySchema, `${config.prod_url1}${dbname}?retryWrites=true&w=majority&appName=Ecommerce`)
    }

    return shipmentDeliveryDao
}

export {
    getShipmentDeliveryDao
}