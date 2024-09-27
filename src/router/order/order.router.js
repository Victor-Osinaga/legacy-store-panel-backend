import { Router } from "express";
import * as orderController from '../../controller/order/order.controller.js'
import verifySubdomain from "../../middlewares/verifySubdomain.js";
import getClientDbMetadata from "../../middlewares/getClientDbMetadata.js";
import getClientDb from "../../middlewares/getClientDb.js";
import verifyTokenAdmin from "../../middlewares/verifyTokenAdmin.js";

// import { isLogged } from "../../middlewares/isLogged.js";
// import { isAdmin } from "../../middlewares/isAdmin.js";

const v1OrderRouter = new Router()
const v1OrderRouterStore = new Router()

// ROUTER ORDER PANEL

// v1OrderRouter.post('/', orderController.createOrder)
// v1OrderRouter.post('/payment', orderController.createPaymentMP)
// v1OrderRouter.get('/', isLogged, isAdmin, orderController.getOrders)
// v1OrderRouter.post('/notification-mp', orderController.getNotificationMP)
// v1OrderRouter.get('/payment/success', orderController.getSuccessController)
// v1OrderRouter.get('/payment/failure', orderController.getFailureController)
// v1OrderRouter.get('/:id', orderController.getStatusOrderById)
v1OrderRouter.get('/', verifyTokenAdmin, getClientDb, orderController.getOrders)
v1OrderRouter.delete('/:id', verifyTokenAdmin, getClientDb, orderController.deleteOrderById)
v1OrderRouter.put('/update-status/:id', verifyTokenAdmin, getClientDb, orderController.putOrderStatusById)

// ROUTER ORDER STORE
v1OrderRouterStore.post('/create-payment', verifySubdomain, orderController.createPaymentMpStore)
v1OrderRouterStore.post('/notification-mp', getClientDbMetadata, orderController.getNotificationMpStore)
v1OrderRouterStore.get('/status/:orderId', verifySubdomain, orderController.getOrderStatusById)


export {
    v1OrderRouterStore,
    v1OrderRouter
}