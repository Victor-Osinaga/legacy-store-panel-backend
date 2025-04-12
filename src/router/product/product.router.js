import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import * as productController from "../../controller/product/product.controller.js";

import firebase from "firebase-admin";
import config from "../../../config.js";
import { deleteFolderRecursive } from "../../utils/deletePath.js";
import { productServiceFactory } from "../../service/product/product.factory.js";
// import { isLogged } from "../../middlewares/isLogged.js";
// import { isAdmin } from "../../middlewares/isAdmin.js";
import getUrlBase from "../../utils/getUrlBase.js";
import verifySubdomain from "../../middlewares/verifySubdomain.js";
import verifyTokenAdmin from "../../middlewares/verifyTokenAdmin.js";
import getClientDb from "../../middlewares/getClientDb.js";
import firebaseInitializer from "../../utils/firebase/initializeFirebase.js";
import uploadImageProductFirebase from "../../middlewares/uploadImageProductFirebase.js";
import { uploadMemory } from "../../utils/multer/multerMemory..js";
import deleteProductImage from "../../utils/firebase/deleteProductImage.firebase.js";

const folderPath = "/tmp/uploads";

// firebase.initializeApp({
//     credential: firebase.credential.cert(config.firebaseAccountKey),
//     storageBucket: config.storage_bucket
// });

const v1ProductRouter = new Router();
const v1ProductRouterStore = new Router();

v1ProductRouter.get(
  "/",
  verifyTokenAdmin,
  getClientDb,
  productController.getProducts
);
v1ProductRouter.get(
  "/:id",
  verifyTokenAdmin,
  getClientDb,
  productController.getProductById
);

// reemplazar el midleware por el midleware "deleteImage"
v1ProductRouter.delete(
  "/:id",
  verifyTokenAdmin,
  getClientDb,
  deleteProductImage,
  // async (req, res, next) => {
  //   try {
  //     const bucket = firebaseInitializer.storage().bucket();

  //     // buscar producto
  //     const dbname = req.proyectName;
  //     const productService = await productServiceFactory(dbname);
  //     const findProduct = await productService.getProductById(req.params.id);

  //     if (!findProduct) {
  //       return res.status(400).json({
  //         status: "failed",
  //         data: "No se encontro un producto con ese ID",
  //       });
  //     }

  //     // encontrar la extension
  //     const regex = /\.([^.?]+)(?:\?.*)?$/;
  //     const match = findProduct.image.match(regex);
  //     const extension = match ? match[1] : null;

  //     if (!extension) {
  //       console.log("No se pudo determinar la extensión de la imagen");
  //       return next();
  //     }
  //     const file = bucket.file(`${req.params.id}.${extension}`);
  //     try {
  //       // Comprobar si existe
  //       const [exists] = await file.exists();

  //       if (exists) {
  //         await file.delete();
  //         console.log(`Imagen ${req.params.id}.${extension} eliminada`);
  //       } else {
  //         console.log("Imagen no encontrada");
  //       }

  //       next(); // Continuar con el siguiente middleware
  //     } catch (error) {
  //       console.error("Error al verificar/eliminar la imagen:", error);
  //       next(error); // Pasar el error al middleware de manejo de errores
  //     }
  //   } catch (error) {
  //     console.error("Error en middleware eliminar imagen de producto:", error);
  //     next(error); // Pasar el error al middleware de manejo de errores
  //   }
  // },
  productController.deleteProductById
);

v1ProductRouter.put(
  "/:id",
  verifyTokenAdmin,
  getClientDb,
  uploadMemory.none(),
  /*isLogged, isAdmin,*/ productController.updateProductById
);

v1ProductRouter.post(
  "/",
  uploadMemory.single("image"),
  verifyTokenAdmin,
  getClientDb,
  // uploadImageProductFirebase,
  productController.createProduct
);

// ENDPOINTS PRODUCT STORE
v1ProductRouterStore.post(
  "/",
  verifySubdomain,
  productController.getProductsStore
);
v1ProductRouterStore.post(
  "/:id",
  verifySubdomain,
  productController.getProductStoreById
);

export { v1ProductRouter, v1ProductRouterStore };
