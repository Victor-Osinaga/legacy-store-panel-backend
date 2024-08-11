import { getCategoryDao } from '../../dao/category/index.dao.js'

import {CategoryRepository} from './Category.repository.js'
import {CategoryService} from './Category.service.js'


async function categoryServiceFactory(dbName) {
    const categoryDao = await getCategoryDao(dbName)
    const repository = new CategoryRepository(categoryDao)
    return new CategoryService(repository) 
}
// const repository = new CategoryRepository(categoryDao)
// const categoryService = new CategoryService(repository)

export {
    // categoryService,
    categoryServiceFactory
}