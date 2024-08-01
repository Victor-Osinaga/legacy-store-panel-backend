import express from 'express';
import cors from 'cors'
// import { v1OrderRouter } from './src/router/order/order.router.js';
import {v1ProductRouter} from './src/router/product/product.router.js'
// import { v1UserRouter } from './src/router/user/user.router.js';
// import { v1CategoryRouter } from './src/router/category/category.router.js';
import cookieParser from 'cookie-parser'
import config from './config.js';

const app = express()

const allowedOriginPattern = /^http:\/\/([a-z0-9]+)\.localhost(:\d+)?$/; // Patrón para subdominios de localhost
const allowedOrigins = [
  config.front_url,  // Otro ejemplo de origen explícito
  // Agrega otros orígenes explícitos si es necesario
];

app.use(cors(
  // {
  //   origin: "http://admintienda.localhost:5173",
  //   credentials: true, 
  // }
  {
    // origin: "https://legacy-store.vercel.app",
    origin: function (origin, callback) {
        // console.log("origin", origin);

        // Permitir solicitudes sin origen, como desde POSTMAN o cURL
        if (!origin) return callback(null, true);

        // Extraer el subdominio usando la expresión regular
        const match = origin.match(allowedOriginPattern);

        if (match) {
            const subdomain = match[1]; // 'viktor' en 'http://viktor.localhost:5173'
            // console.log("Subdominio detectado:", subdomain);

            // Aquí puedes implementar lógica adicional basada en el subdominio, si es necesario

            return callback(null, true);
        }

        // Si el origen coincide con la lista de orígenes permitidos explícitos
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true,      // Permitir cookies y otros credenciales
}
));
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.use('/api/products', v1ProductRouter)
// app.use('/api/users', v1UserRouter) /* es para usuarios del panel */
// app.use('/api/clients', v1ClientRouter) /* es para clientes de la tienda del panel */
// app.use('/api/orders', v1OrderRouter)
// app.use('/api/categories', v1CategoryRouter)
app.use('/asd', (req, res)=>{
  res.send("olaaa")
})

app.all('*', (req, res) => {
    res.json({ error: `404 Not Found`, 
    desc: `No se encontro la página que buscas.` });
  });

export {app}