import firebase from 'firebase-admin'
import { productService } from '../service/product/product.factory.js';
import config from '../../config.js';

firebase.initializeApp({
    credential: firebase.credential.cert(config.firebaseAccountKey),
    storageBucket: config.storage_bucket
});

export default async function deleteImage (req, res, next) {
    try {
        const bucket = firebase.storage().bucket();

        // buscar producto
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
        }else{
            // throw { msg: "Imagen no encontrada", status: 404 }
            next()
        }

    } catch (error) {
        console.log("desde middleware deleteImage : midlewares", error);
        if(error.code) {return res.status(error.code).json({status: "failed", data: "No se pudo eliminar la imagen porque no existe"})}
        res.status(error.status).json({ status: "failed", data: error.msg })
    }
}