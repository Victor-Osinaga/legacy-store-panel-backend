import { getProductDao } from '../../dao/product/index.dao.js'
import {ProductRepository} from './Product.repository.js'
import {ProductService} from './Product.service.js'

async function productServiceFactory(dbURL) {
    const productDao = await getProductDao()
    const repository = new ProductRepository(productDao)
    return new ProductService(repository)
}

// const repository = new ProductRepository(productDao)
// const productService = new ProductService(repository)

export {
    // productService,
    productServiceFactory
}