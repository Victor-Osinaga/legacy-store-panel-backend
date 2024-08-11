import config from "../../../config.js";
import { storeConfigurationSchema } from "../../model/storeConfiguration/schema/storeConfiguration.squema.js";

async function getStoreConfigurationDao(dbName) {
    let storeConfigurationDao;

    if(config.env == 'dev'){
        const { default: StoreConfigurationDevDAO } = await import('./StoreConfigurationDev.dao.js')
        storeConfigurationDao = new StoreConfigurationDevDAO('storeconfigurations', storeConfigurationSchema, `${config.dev_url}${dbName}`)
    }else {
        const { default: StoreConfigurationProdDAO } = await import('./StoreConfigurationProd.dao.js');
        storeConfigurationDao = new StoreConfigurationProdDAO('storeconfigurations', storeConfigurationSchema, `${config.prod_url1}${dbName}?retryWrites=true&w=majority&appName=Ecommerce`);
    }

    return storeConfigurationDao
}

export {
    getStoreConfigurationDao
}