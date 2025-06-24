import express from "express";
import cors from "cors";
import {
  v1OrderRouterStore,
  v1OrderRouter,
} from "./src/router/order/order.router.js";
import {
  v1ProductRouter,
  v1ProductRouterStore,
} from "./src/router/product/product.router.js";
// import { v1UserRouter } from './src/router/user/user.router.js';
import {
  v1CategoryRouter,
  v1CategorieRouterStore,
} from "./src/router/category/category.router.js";
import {
  v1StoreConfigurationRouter,
  v1StoreConfigurationRouterStore,
} from "./src/router/storeConfiguration/storeConfiguration.router.js";
import { v1ClientAdminRouter } from "./src/router/client-admin/client-admin.router.js";
import cookieParser from "cookie-parser";
import config from "./config.js";
import {
  v1ShipmentLocalRouter,
  v1ShipmentLocalRouterStore,
} from "./src/router/shipmentLocal/shipmentLocal.router.js";
import {
  v1ShipmentDeliveryRouter,
  v1ShipmentDeliveryRouterStore,
} from "./src/router/shpmentDelivery/shipmentDelivery.router.js";

const app = express();

// PARA DEFINIR URL BASE
const allowedOrigins = [
  "https://legacy-panel.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
];

// PARA DEFINIR SI ES UN SUBDOMINIO
let allowedOriginPatternFrontStore;
if (config.env == "dev") {
  allowedOriginPatternFrontStore =
    /^https?:\/\/([a-z0-9-]+)-legacystore\.localhost(:\d+)?$/;
} else {
  allowedOriginPatternFrontStore =
    /^https?:\/\/([a-z0-9-]+)-legacystore\.vercel\.app$/;
}
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      console.log("CORS: Solicitud sin origen (permitida)");
      return callback(null, true);
    }

    // 🔹 Normalizar el origin (eliminar barra final si existe)
    const normalizedOrigin = origin.replace(/\/$/, "");
    console.log("origen normalizado: ", normalizedOrigin);

    // Validar contra allowedOrigins
    if (allowedOrigins.includes(normalizedOrigin)) {
      // console.log(`CORS: Dominio permitido -> ${origin}`);
      return callback(null, true);
    }

    // Validar contra el patrón dinámico para subdominios
    if (allowedOriginPatternFrontStore.test(normalizedOrigin)) {
      // console.log(`CORS: Subdominio permitido -> ${origin}`);
      return callback(null, true);
    }

    // Bloquear otros orígenes
    console.error(`CORS: Origen bloqueado -> ${normalizedOrigin}`);
    return callback(new Error("No permitido por CORS"));
  },
  credentials: true, // Habilita el envío de credenciales
};

// Aplica CORS a todas las rutas
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// ENDPOINTS PANEL
app.use("/api-panel/products", v1ProductRouter);
// app.use('/api/users', v1UserRouter) /* es para usuarios del panel */
// app.use('/api/clients', v1ClientRouter) /* es para clientes de la tienda del panel */
app.use("/api-panel/orders", v1OrderRouter);
app.use("/api-panel/categories", v1CategoryRouter);
app.use("/api-panel/store-configuration", v1StoreConfigurationRouter);
app.use("/api-panel/shipment-local", v1ShipmentLocalRouter);
app.use("/api-panel/shipment-delivery", v1ShipmentDeliveryRouter);

// ENDPOINTS STORE
app.use("/api-store/products", v1ProductRouterStore);
app.use("/api-store/categories", v1CategorieRouterStore);
app.use("/api-store/store-configuration", v1StoreConfigurationRouterStore);
app.use("/api-store/orders", v1OrderRouterStore);
app.use("/api-store/shipment-local", v1ShipmentLocalRouterStore);
app.use("/api-store/shipment-delivery", v1ShipmentDeliveryRouterStore);

// ENDPOINTS ADMIN
app.use("/api-admin/clients", v1ClientAdminRouter);

app.use("/asd", (req, res) => {
  res.send("olaaa");
});

app.all("*", (req, res) => {
  res.json({
    error: `404 Not Found`,
    desc: `No se encontro la página que buscas.`,
  });
});

export { app };
