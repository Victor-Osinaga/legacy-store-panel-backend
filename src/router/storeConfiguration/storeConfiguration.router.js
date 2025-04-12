import { Router } from "express";
import verifySubdomain from "../../middlewares/verifySubdomain.js";
import * as storeConfigurationController from "../../controller/storeConfiguration/storeConfiguration.controller.js";
import verifyTokenAdmin from "../../middlewares/verifyTokenAdmin.js";
import getClientDb from "../../middlewares/getClientDb.js";
import multer from "multer";
import { optimizeImageLogo } from "../../utils/optimizeImageLogo/optimizeImageLogo.js";

const uploadMemory = multer({
  storage: multer.memoryStorage(),
});

const v1StoreConfigurationRouter = new Router();
const v1StoreConfigurationRouterStore = new Router();

// ROUTER COFIGURATION STORE - PANEL
// v1StoreConfigurationRouter.post( "/", verifyTokenAdmin, getClientDb, storeConfigurationController.createStoreConfiguration )
v1StoreConfigurationRouter.get(
  "/",
  verifyTokenAdmin,
  getClientDb,
  storeConfigurationController.getStoreConfiguration
);
v1StoreConfigurationRouter.put(
  "/:id",
  verifyTokenAdmin,
  getClientDb,
  storeConfigurationController.updateStoreConfiguration
);

v1StoreConfigurationRouter.put(
  "/update-logo/:idConfig",
  uploadMemory.single("image-logo"),
  verifyTokenAdmin,
  getClientDb,
  optimizeImageLogo,
  storeConfigurationController.updateLogoStoreConfig
);

// ROUTER COFIGURATION STORE - STORE
v1StoreConfigurationRouterStore.post(
  "/",
  verifySubdomain,
  storeConfigurationController.getStoreConfigurationStore
);

export { v1StoreConfigurationRouter, v1StoreConfigurationRouterStore };
