const productModel = require('../model/product.model');

module.exports = {
    getAllProducts: async () => {
        try {
            return await productModel.findAndCountAll({
                attributes: {
                    include: [
                        [productModel.sequelize.literal(`(SELECT categories.name FROM categories WHERE categories.id = products.category)`), 'category_name']
                    ],

                },
                order: [['id', 'asc'], ['category', 'asc']]
            });
        } catch (error) {
            throw error
        }
    },
    createProduct: async (product) => {
        try {
            return await productModel.create(product);
        } catch (error) {
            throw error
        }
    },
    getOneProduct: async (data) => {
        try {
            if (!data.id) {
                throw new Error('Id is required')
            }

            const product = await productModel.findByPk(data.id);
            if (!product) {
                throw new Error('Product not found')
            }

            return product;
        } catch (error) {
            throw error
        }
    },
    updateProduct: async (data) => {
        try {
            if (!data.id) {
                throw new Error('Id is required')
            }
            const product = await productModel.findByPk(data.id);
            if (!product) {
                throw new Error('Product not found')
            }
            return await product.update(data);
        } catch (error) {
            throw error
        }
    },
    deleteProduct: async (data) => {
        try {
            if (!data.id) {
                throw new Error('Id is required')
            }
            const product = await productModel.findByPk(data.id);
            if (!product) {
                throw new Error('Product not found')
            }
            return await product.destroy(data);
        } catch (error) {
            throw error
        }
    }
}