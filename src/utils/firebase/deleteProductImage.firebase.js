import firebaseInitializer from "./initializeFirebase.js";
import { productServiceFactory } from "../../service/product/product.factory.js";

export default async function deleteProductImage(req, res, next) {
  try {
    const bucket = firebaseInitializer.storage().bucket();

    // buscar producto
    const dbname = req.proyectName;
    const productService = await productServiceFactory(dbname);
    const findProduct = await productService.getProductById(req.params.id);

    if (!findProduct) {
      return res.status(400).json({
        status: "failed",
        data: "No se encontro un producto con ese ID",
      });
    }

    // encontrar la extension
    const regex = /\.([^.?]+)(?:\?.*)?$/;
    const match = findProduct.image.match(regex);
    const extension = match ? match[1] : null;

    if (!extension) {
      console.log("No se pudo determinar la extensión de la imagen");
      return next();
    }
    const file = bucket.file(`${req.params.id}.${extension}`);
    try {
      // Comprobar si existe
      const [exists] = await file.exists();

      if (exists) {
        await file.delete();
        console.log(`Imagen ${req.params.id}.${extension} eliminada`);
      } else {
        console.log("Imagen no encontrada");
      }

      next(); // Continuar con el siguiente middleware
    } catch (error) {
      console.error("Error al verificar/eliminar la imagen:", error);
      next(error); // Pasar el error al middleware de manejo de errores
    }
  } catch (error) {
    console.error("Error en middleware eliminar imagen de producto:", error);
    next(error); // Pasar el error al middleware de manejo de errores
  }
}
