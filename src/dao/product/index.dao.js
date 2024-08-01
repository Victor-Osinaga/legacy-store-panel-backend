// import config from '../../../config.js';
// import {productSchema} from '../../model/product/schema/product.schema.js'

// let productDao;
// console.log("desde index dao", config.dev_url, config.prod_url);
// switch (config.env) {


//     case 'prod':
//         const { default: ProductProdDAO } = await import('./ProductProd.dao.js');
//         productDao = new ProductProdDAO('products', productSchema, config.prod_url);
//     break;

//     default:
//         const {default: ProductDevDAO} = await import('./ProductDev.dao.js')
//         productDao = new ProductDevDAO('products', productSchema, config.dev_url)
//         break;
// }

// export { productDao }

import config from '../../../config.js';
import { productSchema } from '../../model/product/schema/product.schema.js'

async function getProductDao() {
    let productDao;

    if (config.env == 'prod') {
        const { defaul: ProductProdDAO } = await import('./ProductProd.dao.js');
        productDao = new ProductProdDAO('products', productSchema);
    } else {
        const { default: ProductDevDAO } = await import('./ProductDev.dao.js')
        productDao = new ProductDevDAO('products', productSchema)
    }

    return productDao
}

export {
    getProductDao
}