import { orderDao } from '../../dao/order/index.dao.js'

import {OrderRepository} from './Order.repository.js'
import {OrderService} from './Order.service.js'

const repository = new OrderRepository(orderDao)

const orderService = new OrderService(repository)

export {
    orderService,
}