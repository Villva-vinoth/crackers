const categoryModel = require('../model/category.model');

module.exports = {
    getAllCategorys: async () => {
        try {
            return await categoryModel.findAndCountAll();
        } catch (error) {
            throw error
        }
    },
    createCategory : async (Category) => {
        try {
            return await categoryModel.create(Category);
        } catch (error) {
            throw error
        }
    },
    getOneCategory : async (data) => {
        try {
            if(!data.id) {
                throw new Error('Id is required')
            }
            const category = await categoryModel.findByPk(data.id);
            if(!category) {
                throw new Error('Category not found')
            }
            return category;
        } catch (error) {
            throw error
        }
    },
    updateCategory : async (data) => {
        try {
            // console.log(data)
            if(!data.id) {
                throw new Error('Id is required')
            }
            const category = await categoryModel.findByPk(data.id);
            if(!category) {
                throw new Error('Category not found')
            }
            return await category.update(data);
        } catch (error) {
            throw error
        }
    },
    deleteCategory : async (data) => {
        try {
            // console.log(data)
            if(!data.id) {
                throw new Error('Id is required')
            }
            const category = await categoryModel.findByPk(data.id);
            if(!category) {
                throw new Error('Category not found')
            }
            return await category.destroy(data);
        } catch (error) {
            throw error
        }
    }
}