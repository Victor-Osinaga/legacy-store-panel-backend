import { getOrderDao } from '../../dao/order/index.dao.js'
import {OrderRepository} from './Order.repository.js'
import {OrderService} from './Order.service.js'

async function orderServiceFactory(dbname) {
    const orderDao = await getOrderDao(dbname)
    const repository = new OrderRepository(orderDao)
    return new OrderService(repository)
}

// const repository = new OrderRepository(orderDao)

// const orderService = new OrderService(repository)

export {
    orderServiceFactory,
}