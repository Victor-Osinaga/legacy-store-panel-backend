import config from '../../../config.js';
import { orderSchema } from '../../model/order/squema/order.squema.js';


async function getOrderDao(dbName) {
    let orderDao;

    if (config.env == 'dev') {
        const { default: OrderDevDAO } = await import('./OrderDev.dao.js')
        orderDao = new OrderDevDAO('orders', orderSchema, `${config.dev_url}${dbName}`)
    } else {
        const { default: OrderProdDAO } = await import('./OrderProd.dao.js');
        orderDao = new OrderProdDAO('orders', orderSchema, `${config.prod_url1}${dbName}?retryWrites=true&w=majority&appName=Ecommerce`);
    }

    return orderDao;
}

export {
    getOrderDao
}