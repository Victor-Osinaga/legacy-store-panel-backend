import { Category } from "../../model/category/model/Category.model.js";
import { v4 as uuidv4 } from "uuid";
import { productServiceFactory } from "../product/product.factory.js";
import { Category2 } from "../../model/category/model/Category2.model.js";
import { uncategorizedCategoryDefault } from "../../utils/defaultConfigStore/defautlConfig.js";
class CategoryService {
  constructor(repository) {
    this.categoryRepository = repository;
  }

  async getCategories() {
    try {
      const verifyUncategorized =
        await this.categoryRepository.repoGetAllByParentNodeIdAndId(
          uncategorizedCategoryDefault.primary.id
        );
      // console.log("verifyUncategorized", verifyUncategorized);

      if (verifyUncategorized.length == 0) {
        const createdUncategorized = await this.createUncategorizedCategory(
          uncategorizedCategoryDefault
        );
        console.log("createdUncategorized", createdUncategorized);
      }
      const categories = await this.categoryRepository.repoGetCategories();
      return categories;
    } catch (error) {
      console.log("desde category service", error);
      throw error;
    }
  }

  async getCategoryById(id) {
    try {
      const categoryNoDto = await this.categoryRepository.repoGetCategoryById(
        id
      );
      if (!categoryNoDto)
        throw { msg: "No se encontro una categoria con ese ID", status: 400 };
      // console.log(productNoDto);
      const category = new Category2(categoryNoDto);
      return category.convertToDTO();
    } catch (error) {
      console.log("desde category service", error);
      throw error;
    }
  }

  async createUncategorizedCategory(defaultData) {
    const primaryCategory = new Category2(defaultData.primary);
    const createdPrimary = await this.categoryRepository.repoCreateCategory(
      primaryCategory.convertToDTO()
    );
    console.log("createdPrimary Uncategorized: ", createdPrimary);

    const secondaryCategory = new Category2(defaultData.secondary);
    const createdSecondary = await this.categoryRepository.repoCreateCategory(
      secondaryCategory.convertToDTO()
    );
    console.log("createdSecondary Uncategorized: ", createdSecondary);

    const tertiaryCategory = new Category2(defaultData.tertiary);
    const createdTertiary = await this.categoryRepository.repoCreateCategory(
      tertiaryCategory.convertToDTO()
    );
    console.log("createdTertiary Uncategorized: ", createdTertiary);
  }

  async updatePrimaryById(id, body) {
    try {
      console.log("body: ", body);

      if (id === "1" || id === "2" || id === "3") {
        throw {
          msg: `No se puede editar esta categoria: ${uncategorizedCategoryDefault.primary.name}`,
          status: 400,
        };
      }
      const findPrimaryById = await this.categoryRepository.repoGetCategoryById(
        id
      );
      if (!findPrimaryById)
        throw { msg: "No se encontro una categoria con ese ID", status: 404 };
      // if (findPrimaryById.level !== "primary")
      //   throw {
      //     msg: "El id proporcionado debe pertenecer a una categoria primaria",
      //     status: 404,
      //   };
      console.log("findPrimaryById: ", findPrimaryById);

      const updatedPrimary =
        await this.categoryRepository.repoUpdatePrimaryById(id, body.name);
      return updatedPrimary;
    } catch (error) {
      console.log("desde updatePrimaryById service", error);
      throw error;
    }
  }

  async deleteCategoryById(id, dbname) {
    try {
      if (id === "1" || id === "2" || id === "3") {
        throw {
          msg: `No se puede eliminar esta categoria: ${uncategorizedCategoryDefault.primary.name}`,
          status: 400,
        };
      }
      const categoryNoDto = await this.categoryRepository.repoGetCategoryById(
        id
      );
      if (!categoryNoDto)
        throw { msg: "No se encontro una categoria con ese ID", status: 404 };
      if (categoryNoDto.level !== "primary")
        throw {
          msg: "Solo se puede eliminar a partir de un id de categoria primaria",
          status: 400,
        };

      const deletedCategory =
        await this.categoryRepository.repoDeleteAllByParentNodeIdAndId(id);

      console.log("deletedCategory", deletedCategory);

      if (deletedCategory.deletedCount > 0) {
        const getUncategorized =
          await this.categoryRepository.repoGetAllByParentNodeIdAndId(
            uncategorizedCategoryDefault.primary.id
          );
        console.log("getUncategorized", getUncategorized);
        // AHORA QUE TENEMOS LA UNCATEGORIZED CATEGORY DEBEMOS ACTUALIZAR TODOS LOS PRODUCTOS
        const productService = await productServiceFactory(dbname);
        console.log("DBNAMEEE: ", dbname);
        const getPrimary = getUncategorized.find((e) => e.level == "primary");
        const getSecondary = getUncategorized.find(
          (e) => e.level == "secondary"
        );
        const getTertiary = getUncategorized.find((e) => e.level == "tertiary");

        const updateUncategorized = [
          {
            categoria: {
              id: getPrimary?.id,
              name: getPrimary?.name,
            },
            subCategoria: {
              id: getSecondary?.id,
              name: getSecondary?.name,
            },
            subSubCategoria: {
              id: getTertiary?.id,
              name: getTertiary?.name,
            },
          },
        ];
        console.log("updateUncategorized", updateUncategorized);
        const updatedAllCategoriesProducts =
          await productService.updateCategoriesProductsAll(
            id,
            updateUncategorized
          );
        return updatedAllCategoriesProducts;
      } else {
        throw { msg: "Error al eliminar la categoria", status: 400 };
      }
      return deletedCategory;
    } catch (error) {
      console.log("desde category service", error);
      throw error;
    }
  }

  async createCategory(body) {
    let longitudSubCategories = body.subCategories?.length;
    try {
      console.log("DESDE CREATE", body);
      const existCategoryByName =
        await this.categoryRepository.repoGetCategoryByName(body.name);
      if (existCategoryByName != null)
        throw { msg: "Ya existe una categoria con ese nombre", status: 400 };

      // const {name, subCategories, ...newBody} = body

      const primaryNodeIdCustom = uuidv4();
      const cattt = {
        id: primaryNodeIdCustom,
        name: body.name,
        parentNodeId: null,
        subCategories: body.subCategories?.map((subcat) => {
          const { id, ...res } = subcat;
          return {
            id: uuidv4(),
            name: subcat.name,
            parentNodeId: primaryNodeIdCustom,
            categories: subcat.categories?.map((subsubcat) => {
              const { id, ...res } = subsubcat;
              return {
                id: uuidv4(),
                name: subsubcat.name,
                parentNodeId: primaryNodeIdCustom,
              };
            }),
          };
        }),
      };
      console.log("cattt: ", cattt);

      const categoryNoDto = new Category2(cattt);

      const createdCategory = await this.categoryRepository.repoCreateCategory(
        categoryNoDto.convertToDTO()
      );
      const newCategory = new Category2(createdCategory);
      return newCategory.convertToDTO();
    } catch (error) {
      // console.log("GG", error.errors["name"]);
      if (error.errors && error.errors["subCategories"]) {
        console.log(`Error en: ${error.errors["subCategories"].message}`);
        throw { msg: `${error.errors["subCategories"].message}`, status: 400 };
      }
      for (let count = 0; count < longitudSubCategories; count++) {
        const subCategoriesPath = `subCategories.${count}.categories`;
        if (error.errors && error.errors[subCategoriesPath]) {
          console.log(
            `Error en la posición ${count}: ${error.errors[subCategoriesPath].message}`
          );
          throw {
            msg: `Almenos una Sub Sub categoria en: ${body.subCategories[count].name} - ${count}`,
            status: 400,
          };
        }
      }
      console.log("Desde category service", error);
      throw error;
    }
  }

  async createCategory2(body) {
    try {
      console.log("body create category service: ", body);
      const { id, name, subCategories } = body;

      // Validar categoria primaria
      if (!id || !name || !subCategories || !subCategories.length) {
        throw {
          msg: "La categoria primaria debe incluir al menos un categoria secundaria",
        };
      }

      // Validar 'name' unico
      const categoryPrimaryByName =
        await this.categoryRepository.repoGetCategoryByName(name);
      if (categoryPrimaryByName) {
        throw {
          msg: "Ya existe una categoria primaria con ese nombre " + name,
          status: 400,
        };
      }
      // Validar subcategorias y categorias terciarias
      for (const subCategory of subCategories) {
        if (!subCategory.id || !subCategory.name) {
          throw {
            msg: "Cada subcategoria deber tener un 'id' y un 'name'",
            status: 400,
          };
        }
        if (!subCategory.categories || !subCategory.categories.length) {
          throw {
            msg: "Cada subcategoria debe incluir al menos una subsubcategoria",
          };
        }

        for (const category of subCategory.categories) {
          if (!category.id || !category.name) {
            throw { msg: "Cada categoria debe tener un 'id' y un 'name'" };
          }
        }
      }

      try {
        // GUARDAR
        const primaryNodeIdCustom = uuidv4();
        const primaryCategory = new Category2({
          id: primaryNodeIdCustom,
          name,
          level: "primary",
          childs: subCategories.length,
          parentId: null,
          parentNodeId: null,
        });

        const createdPrimary = await this.categoryRepository.repoCreateCategory(
          primaryCategory.convertToDTO()
        );
        console.log("createdPrimary", createdPrimary);

        for (const subCategory of subCategories) {
          const secondaryCategory = new Category2({
            id: uuidv4(),
            name: subCategory.name,
            level: "secondary",
            childs: subCategory.categories.length,
            parentId: primaryCategory.getId(),
            parentNodeId: primaryNodeIdCustom,
          });

          const createdSecondary =
            await this.categoryRepository.repoCreateCategory(
              secondaryCategory.convertToDTO()
            );
          console.log("createdSecondary", createdSecondary);

          for (const category of subCategory.categories) {
            const tertiaryCategory = new Category2({
              id: uuidv4(),
              name: category.name,
              level: "tertiary",
              childs: null,
              parentId: secondaryCategory.getId(),
              parentNodeId: primaryNodeIdCustom,
            });
            const createdTertiary =
              await this.categoryRepository.repoCreateCategory(
                tertiaryCategory.convertToDTO()
              );
            console.log("createdTertiary", createdTertiary);
          }
        }
        return createdPrimary;
      } catch (error) {
        console.log("Error al crear las categorias", error);
        throw { msg: "Error al crear las categorias", status: 400 };
      }
    } catch (error) {
      console.log("Desde createCategory2 service", error);
      throw error;
    }
  }

  // async createCategory2(body) {
  //   try {
  //     console.log("body create category service: ", body);

  //     const { primaryCategory, secondaryCategory, tertiaryCategory } = body;

  //     const {
  //       id: id1,
  //       parentId: parentIdPrimary,
  //       childs: childs1,
  //       ...restPrimary
  //     } = primaryCategory;

  //     const {
  //       id: id2,
  //       parentId: parentIdSecondary,
  //       childs: childs2,
  //       ...restSecondary
  //     } = secondaryCategory;

  //     const {
  //       id: id3,
  //       parentId: parentIdTertiary,
  //       childs: childs3,
  //       ...restTertiary
  //     } = tertiaryCategory;

  //     const idPrimary = uuidv4();
  //     const idSecondary = uuidv4();
  //     const idTertiary = uuidv4();

  //     const newPrimaryCategory = new Category2({
  //       id: idPrimary,
  //       parentId: null,
  //       childs: 1,
  //       ...restPrimary,
  //     });
  //     const newSecondaryCategory = new Category2({
  //       id: idSecondary,
  //       parentId: idPrimary,
  //       childs: 1,
  //       ...restSecondary,
  //     });
  //     const newTertiaryCategory = new Category2({
  //       id: idTertiary,
  //       parentId: idSecondary,
  //       childs: null,
  //       ...restTertiary,
  //     });

  //     const createdPrimaryCategory =
  //       await this.categoryRepository.repoCreateCategory(
  //         newPrimaryCategory.convertToDTO()
  //       );

  //     if (createdPrimaryCategory) {
  //       console.log("PRIMARY CATEGORY: ", createdPrimaryCategory);

  //       const createdSecondaryCategory =
  //         await this.categoryRepository.repoCreateCategory(
  //           newSecondaryCategory.convertToDTO()
  //         );
  //       if (createdSecondaryCategory) {
  //         console.log("SECONDARY CATEGORY: ", createdSecondaryCategory);
  //         const createdTertiaryCategory =
  //           await this.categoryRepository.repoCreateCategory(
  //             newTertiaryCategory.convertToDTO()
  //           );
  //         if (createdTertiaryCategory) {
  //           console.log("TERTIARY CATEGORY: ", createdTertiaryCategory);
  //           const createdCategories = {
  //             createdPrimaryCategory,
  //             createdSecondaryCategory,
  //             createdTertiaryCategory,
  //           };
  //           return createdCategories;
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     if (error.name === "ValidationError") {
  //       console.log("errors", error.errors);

  //       const errorMessage = Object.values(error.errors)
  //         .map((err) => err.message)
  //         .join(", "); // Separar los mensajes por comas o cualquier delimitador que prefieras
  //       const errorFields = Object.keys(error.errors).join(", ");
  //       throw {
  //         msg: `Validation CATEGORY failed: ${errorFields}`,
  //         status: 400,
  //       };
  //     }
  //     throw error;
  //   }
  // }

  // SERVICES CATEGORY API STORE
  async getCategoriesStore() {
    try {
      const categories = await this.categoryRepository.repoGetCategoriesStore();
      return categories;
    } catch (error) {
      console.log("desde category service", error);
      throw error;
    }
  }
}

export { CategoryService };
