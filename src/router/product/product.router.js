import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';
import * as productController from '../../controller/product/product.controller.js'


import firebase from 'firebase-admin'
import multer from 'multer';
import config from "../../../config.js";
import { deleteFolderRecursive } from "../../utils/deletePath.js";
import { productServiceFactory } from "../../service/product/product.factory.js";
// import { isLogged } from "../../middlewares/isLogged.js";
// import { isAdmin } from "../../middlewares/isAdmin.js";
import getUrlBase from "../../utils/getUrlBase.js";
import verifyToken from "../../middlewares/verifyToken.js";
import verifySubdomain from "../../middlewares/verifySubdomain.js";
import verifyTokenAdmin from "../../middlewares/verifyTokenAdmin.js";
import getClientDb from "../../middlewares/getClientDb.js";


const upload = multer({ dest: "/tmp/uploads" });

const folderPath = "/tmp/uploads";

firebase.initializeApp({
    credential: firebase.credential.cert(config.firebaseAccountKey),
    storageBucket: config.storage_bucket
});

const v1ProductRouter = new Router()
const v1ProductRouterStore = new Router()

v1ProductRouter.get('/', verifyTokenAdmin, getClientDb, productController.getProducts)
v1ProductRouter.get('/:id', verifyTokenAdmin, getClientDb, productController.getProductById)

// reemplazar el midleware por el midleware "deleteImage"
v1ProductRouter.delete('/:id', verifyTokenAdmin, getClientDb, async (req, res, next) => {
    try {
        const bucket = firebase.storage().bucket();

        // buscar producto
        const dbname = req.proyectName
        const productService = await productServiceFactory(dbname)
        const findProduct = await productService.getProductById(req.params.id)

        // encontrar la extension
        const regex = /(?:\.([^.?]+))(?:\?.*)?$/;
        const extension = findProduct.image.match(regex)[1];

        // buscar el archivo
        const file = bucket.file(`${req.params.id}.${extension}`)

        // comprobar si existe
        const [exists] = await file.exists() /* La respues viene como: [false] o [true] */

        if (exists) {
            const xd = await file.delete()
            next()
        } else {
            // throw { msg: "Imagen no encontrada", status: 404 }
            console.log("Imagen no encontrada");
            next()
        }


    } catch (error) {
        console.log("desde middleware eliminar imagen : product router", error);
        if (error.code) { return res.status(error.code).json({ status: "failed", data: "No se pudo eliminar la imagen porque no existe" }) }
        res.status(error.status).json({ status: "failed", data: error.msg })
    }
}, productController.deleteProductById)

v1ProductRouter.put('/:id', verifyTokenAdmin, getClientDb, upload.none(), /*isLogged, isAdmin,*/ productController.updateProductById)

v1ProductRouter.post("/", verifyTokenAdmin, getClientDb, upload.single("image"), (req, res, next) => {
    // return res.status(499).json({status: "failed", data: "error breakpoint"})
    // console.log("el body", req.body);
    const file = req.file;
    const bucket = firebase.storage().bucket();
    const customId = uuidv4()
    const extension = req.file.originalname.split('.').pop();
    const newFileName = `${customId}.${extension}`;
    // console.log("el PRODUCTI DESDE POST", req.body);
    bucket.upload(file.path, {
        destination: newFileName,
        public: true
    }).then(() => {
        const fileNew = bucket.file(newFileName);

        fileNew.getSignedUrl({
            action: "read",
            expires: "03-09-2491"
        }).then(signedUrls => {
            const url = signedUrls[0];
            // console.log(`La URL de la imagen es: ${url}`);
            // res.status(200).json({status: "Imagen subida con éxito", url: url});

            const urlBase = getUrlBase(url)
            // console.log("url", url);
            // console.log("urlBase", urlBase);

            req.body.image = urlBase
            req.body.id = customId
            deleteFolderRecursive(folderPath);
            next()
        }).catch(err => {
            console.error(`Error al obtener la URL: ${err}`);
        });


        // console.log(`Carpeta ${folderPath} borrada`);
        // console.log(`Carpeta ${folderPath} creada`);
    }).catch(error => {
        res.status(500).send(error);
    });



}, productController.createProduct);

// ENDPOINTS PRODUCT STORE
v1ProductRouterStore.post('/', verifySubdomain, productController.getProductsStore)
v1ProductRouterStore.post('/:id', verifySubdomain, productController.getProductStoreById)

export {
    v1ProductRouter,
    v1ProductRouterStore
}