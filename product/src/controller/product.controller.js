const { getAllProducts, createProduct, getOneProduct, updateProduct, deleteProduct } = require('../service/product.service');

module.exports = {
    getAllProducts: async (req, res, next) => {
        try {
            const products = await getAllProducts();
            res.status(200).json({
                success: true,
                message: "Products fetched successfully",
                data: products.rows
            });
        } catch (error) {
            next(error);
        }
    },
    createProduct: async (req, res, next) => {
        try {
            const product = await createProduct(req.body);
            res.status(200).json({
                success: true,
                message: "Product created successfully",
                data: product
            });
        } catch (error) {
            next(error);
        }
    },
    getOneProduct: async (req, res, next) => {
        try {

            const product = await getOneProduct(req.params);
            res.status(200).json({
                success: true,
                message: "Product fetched successfully",
                data: product
            });
        } catch (error) {
            next(error);
        }
    },
    updateProduct: async (req, res, next) => {
        try {
            const data = { ...req.body, ...req.params };
            const product = await updateProduct(data);
            res.status(200).json({
                success: true,
                message: "Product updated successfully"
            });
        }
        catch (error) {
            next(error);
        }
    },
    deleteProduct: async (req, res, next) => {
        try {
            const data = req.params;
            const product = await deleteProduct(data);
            res.status(200).json({
                success: true,
                message: "Product deleted successfully"
            });
        } catch (error) {
            next(error)
        }
    }
}