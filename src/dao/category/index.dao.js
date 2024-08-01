import config from '../../../config.js';
import { categorySchema } from '../../model/category/schema/category.schema.js';

let categoryDao;

switch (config.env) {

    case 'prod':
        const { default: CategoryProdDAO } = await import('./CategoryProd.dao.js');
        categoryDao = new CategoryProdDAO('categorys', categorySchema, config.prod_url);
    break;

    default:
        const {default: CategoryDevDAO} = await import('./CategoryDev.dao.js')
        categoryDao = new CategoryDevDAO('categorys', categorySchema, config.dev_url)
        break;
}

export { categoryDao }