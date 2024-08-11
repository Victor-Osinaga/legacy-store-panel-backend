import { Category } from "../../model/category/model/Category.model.js";
import { v4 as uuidv4 } from 'uuid';
import { productServiceFactory } from "../product/product.factory.js";

class CategoryService {
    constructor(repository) {
        this.categoryRepository = repository
    }

    async getCategories() {
        try {
            const categories = await this.categoryRepository.repoGetCategories();
            return categories;
        } catch (error) {
            console.log("desde category service", error);
            throw error
        }
    }

    async getCategoryById(id) {
        try {
            const categoryNoDto = await this.categoryRepository.repoGetCategoryById(id);
            if (!categoryNoDto) throw { msg: "No se encontro una categoria con ese ID", status: 400 }
            // console.log(productNoDto);
            const category = new Category(categoryNoDto)
            return category.convertToDTO()
        } catch (error) {
            console.log("desde category service", error);
            throw error
        }
    }

    async deleteCategoryById(id, dbname) {
        try {
            let uncategorized = await this.categoryRepository.repoGetUncategorized()
            console.log("uncategorized uncategorized", uncategorized);
            
            if (!uncategorized) {
                const categoryUncategorizedNoDto = new Category({
                    id: uuidv4(),
                    name: 'Uncategorized',
                    subCategories: [
                        {
                            id: uuidv4(),
                            name: 'Uncategorized',
                            categories: [
                                {
                                    id: uuidv4(),
                                    name: 'Uncategorized'
                                }
                            ]
                        }
                    ]
                }
                )
                const createdCategoryUncategorized = await this.categoryRepository.repoCreateCategory(categoryUncategorizedNoDto.convertToDTO())
                uncategorized = await this.categoryRepository.repoGetUncategorized()
            }
            console.log("uncategorized", uncategorized);
            if (uncategorized.id == id) {
                throw { msg: "No se puede eliminar esta categoria", status: 403 }
            }

            const categoryNoDto = await this.categoryRepository.repoGetCategoryById(id);
            if (!categoryNoDto) throw { msg: "No se encontro una categoria con ese ID", status: 404 }

            const deletedCategory = await this.categoryRepository.repoDeleteCategoryById(id);


            if (deletedCategory.deletedCount > 0) {
                const productService = await productServiceFactory(dbname)
                const products = await productService.getProducts()
                products.forEach(async prod => {
                    if (prod.categories.find(c => c.categoria.id == id) /* && prod.categories.length == 1 PARA CAMBIAR LA CATEGORIA SI TIENE UNA SOLA ASIGNADA AL PRODUCTO PERO SI TIENE MAS CATEGORIAS ELIMINAR LA CATEGORIA A ELIMINAR DEL PRODUCTO*/) {
                        console.log("producto con categoria a eliminar");

                        const updatedCategories = [{
                            categoria: { id: uncategorized.id, name: uncategorized.name },
                            subCategoria: { id: uncategorized.subCategories[0].id, name: uncategorized.subCategories[0].name },
                            subSubCategoria: { id: uncategorized.subCategories[0].categories[0].id, name: uncategorized.subCategories[0].categories[0].name }
                        }]
                        const uncategorizedProduct = {
                            ...prod,
                            sizes: JSON.stringify(prod.sizes),
                            categories: JSON.stringify(updatedCategories)
                        }

                        console.log("uncategorizedProduct", uncategorizedProduct);

                        const updatedProduct = await productService.updateProductById(prod.id, uncategorizedProduct, dbname)
                        if (updatedProduct) {
                            console.log("producto actualizado XDDDD: ", prod.name);
                        }
                    }
                });
            }
            // if(deletedCategory.deletedCount == 1){
            //     const products = await productService.getProducts()
            //     for (const prod of products) {
            //         for (let index = 0; index < prod.categories.length; index++) {
            //             if(prod.categories[index].categoria.id == categoryNoDto.id){
            //                 console.log("desde anidacion");
            //                 const deletedProduct = await productService.deleteProductById(prod.id)
            //                 console.log("eliminado",deletedProduct);
            //             }
            //         }
            //     }
            // }
            return deletedCategory
        } catch (error) {
            console.log("desde category service", error);
            throw error
        }
    }

    // async updateCategoryById(idCategory, body) {
    //     try {
    //         const categoryByIdNoDto = await this.categoryRepository.repoGetCategoryById(idCategory);
    //         if (!categoryByIdNoDto) throw { msg: "No se encontro una categoria con ese ID" }

    //         const categoryByName = await this.categoryRepository.repoGetCategoryByName(body.name)
    //         if (categoryByName && categoryByName.id != categoryByIdNoDto.id) throw { msg: "Ya existe una categoria con ese nombre primario" }
    //         // if(body.name == categoryByIdNoDto.name) throw {msg: "Ya existe una categoria con ese nombre primario"}


    //         const toUpdateCategory = new Category({
    //             id: idCategory,
    //             name: body.name,
    //             subCategories: body.subCategories
    //         })

    //         const updatedCategory = await this.categoryRepository.repoUpdateCategoryById(idCategory, toUpdateCategory.convertToDTO())
    //         if (updatedCategory) {
    //             const products = await productService.getProducts()
    //             for (const prod of products) {
    //                 for (let index = 0; index < prod.categories.length; index++) {
    //                     const cat = prod.categories[index];
    //                     if (cat.categoria.id == updatedCategory.id && cat.categoria.name != updatedCategory.name) {
    //                         prod.categories[index].categoria.name = updatedCategory.name;
    //                         const updProd = await productService.updateProductById(prod.id, { ...prod });
    //                         console.log("updprod", updProd.categories[0]);
    //                     }
    //                     for (let index2 = 0; index2 < updatedCategory.subCategories.length; index2++) {
    //                         if (cat.subCategoria.id == updatedCategory.subCategories[index2].id && cat.subCategoria.name != updatedCategory.subCategories[index2].name) {
    //                             prod.categories[index].subCategoria.name = updatedCategory.subCategories[index2].name;
    //                             const updProd = await productService.updateProductById(prod.id, { ...prod });
    //                             console.log("updprod", updProd.categories[0]);
    //                         }
    //                         for (let index3 = 0; index3 < updatedCategory.subCategories[index2].categories.length; index3++) {
    //                             if (cat.subSubCategoria.id == updatedCategory.subCategories[index2].categories[index3].id && cat.subSubCategoria.name != updatedCategory.subCategories[index2].categories[index3].name) {
    //                                 prod.categories[index].subSubCategoria.name = updatedCategory.subCategories[index2].categories[index3].name
    //                                 const updProd = await productService.updateProductById(prod.id, { ...prod });
    //                                 console.log("updprod", updProd.categories[0]);
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }

    //         return updatedCategory

    //     } catch (error) {
    //         console.log("desde CATEGORY service", error);
    //         throw error
    //     }
    // }

    async createCategory(body) {
        let longitudSubCategories = body.subCategories?.length
        try {
            console.log("DESDE CREATE", body);
            const existCategoryByName = await this.categoryRepository.repoGetCategoryByName(body.name)
            if (existCategoryByName != null) throw { msg: "Ya existe una categoria con ese nombre", status: 400 }

            // const {name, subCategories, ...newBody} = body

            const categoryNoDto = new Category({
                id: uuidv4(),
                name: body.name,
                subCategories: body.subCategories?.map(subcat => {
                    const { id, ...res } = subcat;
                    return {
                        id: uuidv4(),
                        name: subcat.name,
                        categories: subcat.categories?.map(subsubcat => {
                            const { id, ...res } = subsubcat;
                            return {
                                id: uuidv4(),
                                name: subsubcat.name
                            }
                        })
                    }
                })
            })

            const createdCategory = await this.categoryRepository.repoCreateCategory(categoryNoDto.convertToDTO())
            const newCategory = new Category(createdCategory)
            return newCategory.convertToDTO()
        } catch (error) {
            // console.log("GG", error.errors["name"]);
            if (error.errors && error.errors["subCategories"]) {
                console.log(`Error en: ${error.errors["subCategories"].message}`);
                throw { msg: `${error.errors["subCategories"].message}`, status: 400 };
            }
            for (let count = 0; count < longitudSubCategories; count++) {
                const subCategoriesPath = `subCategories.${count}.categories`;
                if (error.errors && error.errors[subCategoriesPath]) {
                    console.log(`Error en la posición ${count}: ${error.errors[subCategoriesPath].message}`);
                    throw { msg: `Almenos una Sub Sub categoria en: ${body.subCategories[count].name} - ${count}`, status: 400 };
                }
            }
            console.log("Desde category service", error);
            throw error
        }
    }

    // SERVICES CATEGORY API STORE
    async getCategoriesStore() {
        try {
            const categories = await this.categoryRepository.repoGetCategoriesStore();
            return categories;
        } catch (error) {
            console.log("desde category service", error);
            throw error
        }
    }
}

export {
    CategoryService
}