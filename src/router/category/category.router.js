import { Router } from "express";
import * as categoryController from '../../controller/category/category.controller.js'
// import { isLogged } from "../../middlewares/isLogged.js";
// import { isAdmin } from "../../middlewares/isAdmin.js";
import verifyToken from "../../middlewares/verifyToken.js";
import verifySubdomain from "../../middlewares/verifySubdomain.js";
import verifyTokenAdmin from "../../middlewares/verifyTokenAdmin.js";
import getClientDb from "../../middlewares/getClientDb.js";

const v1CategoryRouter = new Router()
const v1CategorieRouterStore = new Router()

// v1OrderRouter.get('/', isLogged, isAdmin, categoryController.getOrders)
v1CategoryRouter.get('/',verifyTokenAdmin, getClientDb, categoryController.getCategories)
v1CategoryRouter.post('/', verifyTokenAdmin, getClientDb, categoryController.createCategory)
// v1CategoryRouter.get('/:id', categoryController.getCategoryById)
v1CategoryRouter.delete('/:id', verifyTokenAdmin, getClientDb, categoryController.deleteCategoryById)
// v1CategoryRouter.put('/:id',isLogged, isAdmin, categoryController.updateCategoryById)
// v1OrderRouter.get('/payment/failure', categoryController.getFailureController)

// ENDPONTS CATEGORIE STORE
v1CategorieRouterStore.post('/', verifySubdomain, categoryController.getCategoriesStore)

export {
    v1CategoryRouter,
    v1CategorieRouterStore
}