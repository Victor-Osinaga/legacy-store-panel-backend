import config from '../../../config.js';
import {productServiceFactory} from '../../service/product/product.factory.js'

const getProducts = async (req, res) => {
    const url = `mongodb://127.0.0.1:27017/`
    const dbname = req.subdomain
    try {
        const productService = await productServiceFactory()
        const products = await productService.getProducts(url, dbname);
        res.status(200).json({status: "ok", data: products});
    } catch (error) {
        res.status(500).json({status: "failed", data: error.msg})
    }
}

// const createProduct = async (req, res) => {
//     const bd = req.subdomain
//     try {
//         const productService = await productServiceFactory()
//         const product = await productService.createProduct(req.body, bd);
//         res.status(200).json({status: "ok", data: product});
//     } catch (error) {
//         console.log("desde product controller", error);
//         res.status(error.status).json({status: "failed", data: error.msg})
//     }
// }

// const getProductById = async (req, res) => {
//     try {
//         const product = await productService.getProductById(req.params.id);
//         res.status(200).json({status: "ok", data: product});
//     } catch (error) {
//         res.status(error.status).json({status: "failed", data: error.msg})
//     }
// }

// const deleteProductById = async (req, res) => {
//     try {
//         const deletedProduct = await productService.deleteProductById(req.params.id);
//         res.status(200).json({status: "ok", data: deletedProduct});
//     } catch (error) {
//         console.log("desde deleteProductById : controller", error );
//         res.status(error.status).json({status: "failed", data: error.msg})
//     }
// }

// const updateProductById = async (req, res) => {
//     console.log("desde update", req.body);
//     try {
//         const updatedProduct = await productService.updateProductById(req.params.id, req.body);
//         res.status(200).json({status: "ok", data: updatedProduct});
//     } catch (error) {
//         res.status(500).json({status: "failed", data: error.msg})
//     }
// }

export {
    getProducts,
    // createProduct,
    // getProductById,
    // deleteProductById,
    // updateProductById
}