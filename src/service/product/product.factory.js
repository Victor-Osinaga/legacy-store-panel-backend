import { getProductDao } from '../../dao/product/index.dao.js'
import {ProductRepository} from './Product.repository.js'
import {ProductService} from './Product.service.js'

async function productServiceFactory(dbname) {
    const productDao = await getProductDao(dbname)
    const repository = new ProductRepository(productDao)
    return new ProductService(repository)
}

// const repository = new ProductRepository(productDao)
// const productService = new ProductService(repository)

export {
    // productService,
    productServiceFactory
}