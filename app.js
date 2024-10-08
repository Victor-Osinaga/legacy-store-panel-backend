import express from 'express';
import cors from 'cors'
import { v1OrderRouterStore, v1OrderRouter } from './src/router/order/order.router.js';
import { v1ProductRouter, v1ProductRouterStore } from './src/router/product/product.router.js'
// import { v1UserRouter } from './src/router/user/user.router.js';
import { v1CategoryRouter, v1CategorieRouterStore } from './src/router/category/category.router.js';
import { v1StoreConfigurationRouter, v1StoreConfigurationRouterStore } from './src/router/storeConfiguration/storeConfiguration.router.js';
import { v1ClientAdminRouter } from './src/router/client-admin/client-admin.router.js'
import cookieParser from 'cookie-parser'
import config from './config.js';
import { v1ShipmentLocalRouter, v1ShipmentLocalRouterStore } from './src/router/shipmentLocal/shipmentLocal.router.js';
import { v1ShipmentDeliveryRouter, v1ShipmentDeliveryRouterStore } from './src/router/shpmentDelivery/shipmentDelivery.router.js';

const app = express()

// const allowedOriginPatternFrontPanelDev = /^https?:\/\/([a-z0-9]+)\.localhost(:\d+)?$/;
// const allowedOriginPatternFrontPanelProd = /^https?:\/\/([a-z0-9-]+)\.legacy-panel\.vercel\.app$/;
// const allowedOriginPatternFrontStoreProd = /^https?:\/\/([a-z0-9-]+)\.legacy-store\.vercel\.app$/;
// let allowedOrigins;
// if(config.env == 'dev'){
//   console.log("MODO DEV");

//   allowedOrigins = [
//     config.front_url_panel_dev,
//     config.front_url_store_dev,  // Otro ejemplo de origen explícito
//     // Agrega otros orígenes explícitos si es necesario
//   ]
// }else{
//   console.log("MODO PROD");
//   allowedOrigins = [
//     config.front_url_panel_prod,
//     config.front_url_store_prod,  // Otro ejemplo de origen explícito
//     // Agrega otros orígenes explícitos si es necesario
//   ]
// }


// app.use(cors(
//   {
//     // origin: "https://legacy-store.vercel.app",
//     origin: function (origin, callback) {
//         // console.log("origin", origin);

//         // Permitir solicitudes sin origen, como desde POSTMAN o cURL
//         if (!origin) return callback(null, true);

//         // Extraer el subdominio usando la expresión regular
//         const matchdev = origin.match(allowedOriginPatternFrontPanelDev);

//         if (matchdev) {
//             const subdomain = matchdev[1]; // 'viktor' en 'http://viktor.localhost:5173'
//             console.log("Subdominio detectado Panel MODO DEV:", subdomain);

//             // Aquí puedes implementar lógica adicional basada en el subdominio, si es necesario

//             return callback(null, true);
//         }

//         // Extraer el subdominio usando la expresión regular
//         const matchprod = origin.match(allowedOriginPatternFrontPanelProd);

//         if (matchprod) {
//             const subdomain = matchprod[1]; // 'viktor' en 'http://viktor.localhost:5173'
//             console.log("Subdominio detectado Panel MODO PROD:", subdomain);

//             // Aquí puedes implementar lógica adicional basada en el subdominio, si es necesario

//             return callback(null, true);
//         }

//         // Extraer el subdominio usando la expresión regular
//         const matchStoreProd = origin.match(allowedOriginPatternFrontStoreProd);

//         if (matchStoreProd) {
//             const subdomain = matchStoreProd[1]; // 'viktor' en 'http://viktor.localhost:5173'
//             console.log("Subdominio detectado Store MODO PROD:", subdomain);

//             // Aquí puedes implementar lógica adicional basada en el subdominio, si es necesario

//             return callback(null, true);
//         }

//         // Si el origen coincide con la lista de orígenes permitidos explícitos
//         if (allowedOrigins.includes(origin)) {
//             return callback(null, true);
//         } else {
//             return callback(new Error('No permitido por CORS'));
//         }
//     },
//     credentials: true,      // Permitir cookies y otros credenciales
// }
// ));

const allowedOrigins = ['https://legacy-panel.vercel.app', 'http://localhost:5173', 'http://localhost:5174'];
// const allowedOriginPatternFrontStoreProd = /^https?:\/\/([a-z0-9-]+)\.legacy-store\.vercel\.app$/;
let allowedOriginPatternFrontStore;
if (config.env == 'dev') {
  allowedOriginPatternFrontStore = /^https?:\/\/([a-z0-9-]+)-legacystore\.localhost(:\d+)?$/;
} else {
  allowedOriginPatternFrontStore = /^https?:\/\/([a-z0-9-]+)-legacystore\.vercel\.app$/;
}
const corsOptions = {
  origin: (origin, callback) => {
    // Permitir solicitudes sin origen, como desde POSTMAN o cURL
    if (!origin) return callback(null, true);

    // Extraer el subdominio usando la expresión regular
    const match = origin.match(allowedOriginPatternFrontStore);

    if (match) {
      const subdomain = match[1]; // 'viktor' en 'http://viktor-legacy.localhost:5173'
      console.log(`Subdominio detectado STORE MODO ${config.env} :`, subdomain);

      // Aquí puedes implementar lógica adicional basada en el subdominio, si es necesario

      return callback(null, true);
    }
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORSSSSS'));
    }
  },
  credentials: true, // Habilita el envío de credenciales
};

// Aplica CORS a todas las rutas
app.use(cors(corsOptions));
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

// ENDPOINTS PANEL
app.use('/api-panel/products', v1ProductRouter)
// app.use('/api/users', v1UserRouter) /* es para usuarios del panel */
// app.use('/api/clients', v1ClientRouter) /* es para clientes de la tienda del panel */
app.use('/api-panel/orders', v1OrderRouter)
app.use('/api-panel/categories', v1CategoryRouter)
app.use('/api-panel/store-configuration', v1StoreConfigurationRouter)
app.use('/api-panel/shipment-local', v1ShipmentLocalRouter)
app.use('/api-panel/shipment-delivery', v1ShipmentDeliveryRouter)

// ENDPOINTS STORE
app.use('/api-store/products', v1ProductRouterStore)
app.use('/api-store/categories', v1CategorieRouterStore)
app.use('/api-store/store-configuration', v1StoreConfigurationRouterStore)
app.use('/api-store/orders', v1OrderRouterStore)
app.use('/api-store/shipment-local', v1ShipmentLocalRouterStore)
app.use('/api-store/shipment-delivery', v1ShipmentDeliveryRouterStore)


// ENDPOINTS ADMIN
app.use('/api-admin/clients', v1ClientAdminRouter)

app.use('/asd', (req, res) => {
  res.send("olaaa")
})

app.all('*', (req, res) => {
  res.json({
    error: `404 Not Found`,
    desc: `No se encontro la página que buscas.`
  });
});

export { app }