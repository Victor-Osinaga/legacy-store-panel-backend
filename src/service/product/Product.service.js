import { v4 as uuidv4 } from 'uuid';
import { Product } from '../../model/product/model/Product.model.js'
import { categoryServiceFactory } from "../category/category.factory.js";
import moment from 'moment-timezone';


class ProductService{
    constructor(repository){
        this.productRepository = repository
    }

    async getProducts (){
        try {
            const products = await this.productRepository.repoGetProducts();
            return products;
        } catch (error) {
            console.log("desde producto service", error);
            throw error
        }
    }

    async getProductById(id) {
        try {
            const productNoDto = await this.productRepository.repoGetProductById(id);
            if(!productNoDto) throw {msg: "No se encontro un producto con ese ID", status: 404}
            // console.log(productNoDto);
            const product = new Product(productNoDto)
            return product.convertToDTO()
        } catch (error) {
            console.log("desde producto service", error);
            throw error
        }
    }

    async deleteProductById(id) {
        try {
            const productNoDto = await this.productRepository.repoGetProductById(id);
            if(!productNoDto) throw {msg: "No se encontro un producto con ese ID", status: 404}

            const deletedProduct = await this.productRepository.repoDeleteProductById(id);
            // const deletedProductNoDto = new Product(productNoDto)
            // return deletedProductNoDto.convertToDTO()
            return deletedProduct
        } catch (error) {
            console.log("desde producto service : deleteProductById", error);
            throw error
        }
    }

    async updateProductById(idProduct, body, dbname){
        console.log("vody desde update product", body);
        try {
            const productByIdNoDto = await this.productRepository.repoGetProductById(idProduct);
            if(!productByIdNoDto) throw {msg: "No se encontro un producto con ese ID", status: 400}
            // console.log("productByIdNoDto", productByIdNoDto);
            
            // console.log("BODY desde update product", body);
            const {id, price, categories, sizes, stock, weight, ...newBody} = body
            const categoriesParsed = JSON.parse(categories)
            const sizesParsed = JSON.parse(sizes)
            const categoryService = await categoryServiceFactory(dbname)
            const categoryFind = await categoryService.getCategoryById(categoriesParsed[0].categoria.id)
            if(!categoryFind) throw {msg: "No se encontro una categoria con ese ID"}
            const subCategoryFind = categoryFind.subCategories.find(cat=>cat.id == categoriesParsed[0].subCategoria.id)
            if(!subCategoryFind) throw {msg: "No se encontro una subCategoria con ese ID"}
            const subSubCategoryFind = subCategoryFind.categories.find(cat=>cat.id == categoriesParsed[0].subSubCategoria.id)
            if(!subSubCategoryFind) throw {msg: "No se encontro una subSubCategoria con ese ID"}

            const newProduct = new Product({
                id: idProduct,
                price: Number(price),
                image: productByIdNoDto.image,
                categories: [
                    {
                        categoria: {id: categoryFind.id, name: categoryFind.name},
                        subCategoria: {id: subCategoryFind.id, name: subCategoryFind.name},
                        subSubCategoria: {id: subSubCategoryFind.id, name: subSubCategoryFind.name}
                    }
                ],
                sizes: sizesParsed,
                stock: Number(stock),
                weight: Number(weight),
                ...newBody
            })
            // console.log("PRODDD", newProduct.convertToDTO());
            const updatedProductNoDto = await this.productRepository.repoUpdateProductById(idProduct, newProduct.convertToDTO())
            if(!updatedProductNoDto) throw {msg: "No se pudo actualizar el product", status: 400}
            const newUpdatedProduct = new Product(updatedProductNoDto)
            return newUpdatedProduct.convertToDTO()
        } catch (error) {
            console.log("desde producto service", error);
            throw error
        }
    }

    async createProduct(body, dbname) {
        try {
            const existProductByName = await this.productRepository.repoGetProductByName(body.name)
            if(existProductByName != null) throw {msg: "Ya existe un producto con ese nombre", status: 400}

            // console.log("ELBODYS",body);
            const {sizes, id, primaryCategory, secondaryCategory, terciaryCategory, weight, price, ...newBody} = body
            
            const categoryService = await categoryServiceFactory(dbname)
            const categoryFind = await categoryService.getCategoryById(primaryCategory)
            if(!categoryFind) throw {msg: "No se encontro una categoria con ese ID", status: 400}
            const subCategoryFind = categoryFind.subCategories.find(cat=>cat.id == secondaryCategory)
            if(!subCategoryFind) throw {msg: "No se encontro una subCategoria con ese ID", status: 400}
            const subSubCategoryFind = subCategoryFind.categories.find(cat=>cat.id == terciaryCategory)
            if(!subSubCategoryFind) throw {msg: "No se encontro una subSubCategoria con ese ID", status: 400}

            // console.log("ENCONTRADA", categoryFind);
            // console.log("SUB ENCONTRAR", subCategoryFind);
            // console.log("SUB SUB ENCONTRAR", subSubCategoryFind);
            // console.log("sizes prueba", sizes[0]);
            // console.log("sizes", JSON.stringify(sizes));
            const newTimestamp = moment().tz('America/Argentina/Buenos_Aires').format('DD/MM/YYYY')
            // console.log("newTimestamp", newTimestamp);
            const productNoDto = new Product({
                id: id, /** esta id viene de la subida de imagen anterior a nivel de midleware */
                price: Number(price),
                sizes: JSON.parse(sizes),
                categories: [
                    {
                        categoria: {id: await categoryFind.id, name: await categoryFind.name},
                        subCategoria: {id: await subCategoryFind.id, name: await subCategoryFind.name},
                        subSubCategoria: {id: await subSubCategoryFind.id, name: await subSubCategoryFind.name}
                    }
                ],
                
                weight: Number(weight),
                timestamp: newTimestamp,
                ...newBody
            })

            // console.log("EL PRODUCTO FINAL ANTES DE GUARDAR", productNoDto.convertToDTO());

            const createdProduct = await this.productRepository.repoCreateProduct(productNoDto.convertToDTO())
            
            const newProduct = new Product(createdProduct)
            // console.log("EL PRODUCTO FINAL DESPUES DE GUARDAR", newProduct.convertToDTO().categories);
            return newProduct.convertToDTO()
        } catch (error) {
            console.log("desde producto service", error);
            throw error
        }
    }

    // SERVICES PRODUCT API STORE
    
    async getProductsStore (){
        try {
            const products = await this.productRepository.repoGetProductsStore();
            return products;
        } catch (error) {
            console.log("desde producto service", error);
            throw error
        }
    }

    async getProductStoreById(id) {
        try {
            const productById = await this.productRepository.repoGetProductStoreById(id);
            if(!productById) throw {msg: "No se encontro un producto con ese ID", status: 404}
            return productById;
        } catch (error) {
            console.log("desde producto service", error);
            throw error
        }
    }
}

export {
    ProductService
}