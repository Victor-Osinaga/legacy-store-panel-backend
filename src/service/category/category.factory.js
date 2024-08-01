import { categoryDao } from '../../dao/category/index.dao.js'

import {CategoryRepository} from './Category.repository.js'
import {CategoryService} from './Category.service.js'

const repository = new CategoryRepository(categoryDao)

const categoryService = new CategoryService(repository)

export {
    categoryService,
}