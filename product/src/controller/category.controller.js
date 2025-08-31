const { getAllCategorys, createCategory, getOneCategory, updateCategory, deleteCategory } = require('../service/category.service');

module.exports = {
    getAllCategorys: async (req, res, next) => {
        try {
            const Category = await getAllCategorys();
            res.status(200).json({
                success: true,
                message: "Category fetched successfully",
                data: Category.rows
            });
        } catch (error) {
            next(error);
        }
    },
    createCategory: async (req, res, next) => {
        try {
            const Category = await createCategory(req.body);
            res.status(200).json({
                success: true,
                message: "Category created successfully",
                data: Category
            });
        } catch (error) {
            next(error);
        }
    },
    getOneCategory: async (req, res, next) => {
        try {

            const Category = await getOneCategory(req.params);
            res.status(200).json({
                success: true,
                message: "Category fetched successfully",
                data: Category
            });
        } catch (error) {
            next(error);
        }
    },
    updateCategory: async (req, res, next) => {
        try {
            const data = { ...req.body, ...req.params };
            const Category = await updateCategory(data);
            res.status(200).json({
                success: true,
                message: "Category updated successfully"
            });
        }
        catch (error) {
            next(error);
        }
    },
    deleteCategory: async (req, res, next) => {
        try {
            const data = req.params;
            const Category = await deleteCategory(data);
            res.status(200).json({
                success: true,
                message: "Category deleted successfully"
            });
        } catch (error) {
            next(error)
        }
    }
}