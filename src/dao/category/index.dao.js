// import config from '../../../config.js';
// import { categorySchema } from '../../model/category/schema/category.schema.js';

// let categoryDao;

// switch (config.env) {

//     case 'prod':
//         const { default: CategoryProdDAO } = await import('./CategoryProd.dao.js');
//         categoryDao = new CategoryProdDAO('categorys', categorySchema, config.prod_url);
//     break;

//     default:
//         const {default: CategoryDevDAO} = await import('./CategoryDev.dao.js')
//         categoryDao = new CategoryDevDAO('categorys', categorySchema, config.dev_url)
//         break;
// }

// export { categoryDao }

import config from '../../../config.js';
import { categorySchema } from '../../model/category/schema/category.schema.js';

async function getCategoryDao(dbName) {
    let categoryDao;

    if (config.env == 'dev') {
        const { default: CategoryDevDAO } = await import('./CategoryDev.dao.js')
        categoryDao = new CategoryDevDAO('categorys', categorySchema, `${config.dev_url}${dbName}`)
    } else {
        const { default: CategoryProdDAO } = await import('./CategoryProd.dao.js');
        categoryDao = new CategoryProdDAO('categorys', categorySchema, `${config.prod_url1}${dbName}?retryWrites=true&w=majority&appName=Ecommerce`);
    }

    return categoryDao
}

export {
    getCategoryDao
}