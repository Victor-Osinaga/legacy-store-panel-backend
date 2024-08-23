import { Router } from "express";
import * as orderController from '../../controller/order/order.controller.js'
import verifySubdomain from "../../middlewares/verifySubdomain.js";
// import { isLogged } from "../../middlewares/isLogged.js";
// import { isAdmin } from "../../middlewares/isAdmin.js";

const v1OrderRouter = new Router()
const v1OrderRouterStore = new Router()

// v1OrderRouter.post('/', orderController.createOrder)
// v1OrderRouter.post('/payment', orderController.createPaymentMP)
// v1OrderRouter.get('/', isLogged, isAdmin, orderController.getOrders)
// v1OrderRouter.post('/notification-mp', orderController.getNotificationMP)
// v1OrderRouter.get('/payment/success', orderController.getSuccessController)
// v1OrderRouter.get('/payment/failure', orderController.getFailureController)
// v1OrderRouter.get('/:id', orderController.getStatusOrderById)

// ROUTER ORDER STORE
v1OrderRouterStore.post('/payment', verifySubdomain, orderController.createPaymentMpStore)

export {
    v1OrderRouterStore
}