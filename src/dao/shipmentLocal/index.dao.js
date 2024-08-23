import config from "../../../config.js";
import { shipmentLocalSquema } from "../../model/shipmentLocal/schema/shipmentLocal.schema.js";

async function getShipmentLocalDao(dbName) {
    let shipmentLocalDao;

    if(config.env == 'dev'){
        const { default: ShipmentLocalDevDAO } = await import('./ShipmentLocalDev.dao.js')
        shipmentLocalDao = new ShipmentLocalDevDAO('shipmentLocals', shipmentLocalSquema, `${config.dev_url}${dbName}`)
    }else{
        const { default: ShipmentLocalProdDAO } = await import('./ShipmentLocalProd.dao.js')
        shipmentLocalDao = new ShipmentLocalProdDAO('shipmentLocals', shipmentLocalSquema, `${config.prod_url1}${dbName}?retryWrites=true&w=majority&appName=Ecommerce`)
    }

    return shipmentLocalDao
}

export {
    getShipmentLocalDao
}