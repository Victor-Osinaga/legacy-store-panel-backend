import config from "../../../config.js";
import { clientAdminSquema } from "../../model/client-admin/squema/clientAdmin.schema.js";


let clientAdminDao;

switch (config.env) {
    case 'dev':
        console.log("modo dev");
        const { default: ClientAdminDevDAO } = await import('./ClientAdminDev.dao.js')
        clientAdminDao = new ClientAdminDevDAO('clients', clientAdminSquema, config.dev_url_database_admin)
        break;

    default:
        console.log("modo prod");
        const { default: ClientAdminProdDAO } = await import('./ClientAdminProd.dao.js')
        clientAdminDao = new ClientAdminProdDAO('clients', clientAdminSquema, config.prod_url_database_admin)
        break;
}

export default clientAdminDao;