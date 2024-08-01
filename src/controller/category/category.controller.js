import {categoryService} from '../../service/category/category.factory.js'

const getCategories = async (req, res) => {
    // console.log("req: ", req.get('origin'));
    try {
        const categories = await categoryService.getCategories();
        res.status(200).json({status: "ok", data: categories});
    } catch (error) {
        res.status(500).json({status: "failed", data: error.msg})
    }
}

const createCategory = async (req, res) => {
    try {
        console.log("ELBODY",req.body);
        const category = await categoryService.createCategory(req.body);
        res.status(200).json({status: "ok", data: category});
    } catch (error) {
        console.log("Desde error controller", error);
        res.status(error.status).json({status: "failed", data: error.msg})
    }
}

const getCategoryById = async (req, res) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        res.status(200).json({status: "ok", data: category});
    } catch (error) {
        res.status(500).json({status: "failed", data: error.msg})
    }
}

const deleteCategoryById = async (req, res) => {
    try {
        const category = await categoryService.deleteCategoryById(req.params.id);
        res.status(200).json({status: "ok", data: category});
    } catch (error) {
        res.status(error.status).json({status: "failed", data: error.msg})
    }
}

const updateCategoryById = async (req, res) => {
    try {
        console.log(req.body);
        const category = await categoryService.updateCategoryById(req.params.id, req.body);
        res.status(200).json({status: "ok", data: category});
    } catch (error) {
        res.status(error.status).json({status: "failed", data: error.msg})
    }
}
export {
    getCategories,
    createCategory,
    getCategoryById,
    deleteCategoryById,
    updateCategoryById,
}