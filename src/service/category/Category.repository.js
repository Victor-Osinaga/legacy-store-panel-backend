class CategoryRepository{
    constructor(dao){
        this.dao = dao
    }

    async repoGetCategories () {
        try {
            const categories = await this.dao.getCategories()
            return categories
        } catch (error) {
            console.log("desde category repository", error);
            throw error
        }
    }

    async repoGetCategoryByName(name){
        try {
            const categoryByNameNoDto = await this.dao.getCategoryByName(name)
            if(!categoryByNameNoDto) return null
            return categoryByNameNoDto
        } catch (error) {
            throw error
            console.log("desde category repository", error);
        }
    }

    async repoGetCategoryById(id) {
        try {
            const category = await this.dao.getCategoryById(id)
            return category
        } catch (error) {
            console.log("desde category repository", error);
            throw error
        }
    }

    // async repoGetCategoryByName(name) {
    //     try {
    //         const categoryByName = await this.dao.getCategoryByName(name)
    //         return categoryByName
    //     } catch (error) {
    //         console.log("desde category repository", error);
    //         throw error
    //     }
    // }

    async repoDeleteCategoryById(id)  {
        try {
            const deletedCategory = await this.dao.deleteCategoryById(id)
            return deletedCategory
        } catch (error) {
            console.log("desde category repository", error);
            throw error
        }
    }

    // async repoUpdateCategoryById(id, newCategory){
    //     try {
    //         const updatedCategory = await this.dao.updateCategoryById(id, newCategory)
    //         return updatedCategory
    //     } catch (error) {
    //         console.log("desde category repository", error);
    //         throw error
    //     }
    // }

    async repoCreateCategory(categoryDto){
        try {
            const createdCategoryNoDto = await this.dao.createCategory(categoryDto)
            return createdCategoryNoDto
        } catch (error) {
            throw error
            console.log("desde category repository", error);
        }
    }

    async repoGetUncategorized(){
        try {
            const uncategorized = await this.dao.getUncategorized("Uncategorized")
            return uncategorized
        } catch (error) {
            console.log("desde category repository : repoGetUncategorized");
            throw error
        }
    }

    // REPOSITORY CATEGORY API STORE

    async repoGetCategoriesStore () {
        try {
            const categories = await this.dao.getCategoriesStore()
            return categories
        } catch (error) {
            console.log("desde category repository", error);
            throw error
        }
    }
}

export {
    CategoryRepository
}