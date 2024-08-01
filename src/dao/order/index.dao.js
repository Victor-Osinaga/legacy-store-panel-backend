import config from '../../../config.js';
import { orderSchema } from '../../model/order/squema/order.squema.js';

let orderDao;

switch (config.env) {

    case 'prod':
        const { default: OrderProdDAO } = await import('./OrderProd.dao.js');
        orderDao = new OrderProdDAO('orders', orderSchema, config.prod_url);
    break;

    default:
        const {default: OrderDevDAO} = await import('./OrderDev.dao.js')
        orderDao = new OrderDevDAO('orders', orderSchema, config.dev_url)
        break;
}

export { orderDao }