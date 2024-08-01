import { Router } from "express";
import * as categoryController from '../../controller/category/category.controller.js'
import { isLogged } from "../../middlewares/isLogged.js";
import { isAdmin } from "../../middlewares/isAdmin.js";

const v1CategoryRouter = new Router()

// v1OrderRouter.get('/', isLogged, isAdmin, categoryController.getOrders)
v1CategoryRouter.get('/', categoryController.getCategories)
v1CategoryRouter.post('/', /*isLogged, isAdmin,*/ categoryController.createCategory)
v1CategoryRouter.get('/:id', categoryController.getCategoryById)
v1CategoryRouter.delete('/:id', /*isLogged, isAdmin,*/ categoryController.deleteCategoryById)
v1CategoryRouter.put('/:id',isLogged, isAdmin, categoryController.updateCategoryById)
// v1OrderRouter.get('/payment/failure', categoryController.getFailureController)

export {
    v1CategoryRouter
}