// import config from '../../../config.js';
// import {userSchema} from '../../model/user/schema/user.schema.js'

// let userDao;

// switch (config.env) {

//     case 'prod':
//         const { default: UserProdDAO } = await import('./UserProd.dao.js');
//         userDao = new UserProdDAO('users', userSchema, config.prod_url);
//     break;

//     default:
//         const {default: UserDevDAO} = await import('./UserDev.dao.js')
//         userDao = new UserDevDAO('users', userSchema, config.dev_url)
//     break;
// }

// export { userDao }