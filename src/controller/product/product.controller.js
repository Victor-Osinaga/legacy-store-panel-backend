import config from '../../../config.js';
import {productServiceFactory} from '../../service/product/product.factory.js'

const getProducts = async (req, res) => {
    const dbname = req.subdomain
    try {
        const productService = await productServiceFactory(dbname)
        const products = await productService.getProducts();
        res.status(200).json({status: "ok", data: products});
    } catch (error) {
        res.status(500).json({status: "failed", data: error.msg})
    }
}

const createProduct = async (req, res) => {
    const dbname = req.subdomain
    try {
        const productService = await productServiceFactory(dbname)
        const product = await productService.createProduct(req.body, dbname);
        res.status(200).json({status: "ok", data: product});
    } catch (error) {
        console.log("desde product controller", error);
        res.status(error.status).json({status: "failed", data: error.msg})
    }
}

const getProductById = async (req, res) => {
    const dbname = req.subdomain
    try {
        const productService = await productServiceFactory(dbname)
        const product = await productService.getProductById(req.params.id);
        res.status(200).json({status: "ok", data: product});
    } catch (error) {
        res.status(error.status).json({status: "failed", data: error.msg})
    }
}

const deleteProductById = async (req, res) => {
    const dbname = req.subdomain
    try {
        const productService = await productServiceFactory(dbname)
        const deletedProduct = await productService.deleteProductById(req.params.id);
        res.status(200).json({status: "ok", data: deletedProduct});
    } catch (error) {
        console.log("desde deleteProductById : controller", error );
        res.status(error.status).json({status: "failed", data: error.msg})
    }
}

const updateProductById = async (req, res) => {
    // console.log("desde update", req.body);
    const dbname = req.subdomain
    try {
        const productService = await productServiceFactory(dbname)
        const updatedProduct = await productService.updateProductById(req.params.id, req.body, dbname);
        res.status(200).json({status: "ok", data: updatedProduct});
    } catch (error) {
        res.status(500).json({status: "failed", data: error.msg})
    }
}

// CONTROLLERS PRODUCT API STORE

const getProductsStore = async (req, res) => {
    const dbname = req.subdomain
    try {
        const productService = await productServiceFactory(dbname)
        const products = await productService.getProductsStore();
        res.status(200).json({status: "ok", data: products});
    } catch (error) {
        res.status(500).json({status: "failed", data: error.msg})
    }
}

const getProductStoreById = async (req, res) => {
    const dbname = req.subdomain
    try {
        const productService = await productServiceFactory(dbname)
        const productById = await productService.getProductStoreById(req.params.id);
        res.status(200).json({status: "ok", data: productById});
    } catch (error) {
        res.status(500).json({status: "failed", data: error.msg})
    }
}

export {
    getProducts,
    createProduct,
    getProductById,
    deleteProductById,
    updateProductById,
    getProductsStore,
    getProductStoreById
}