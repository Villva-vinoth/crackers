const { getAllOrders, createOrder, getOneOrder, updateOrder } = require('../service/orderHistory.service');

module.exports = {
    getAllOrders: async (req, res, next) => {
        try {
            const orders = await getAllOrders();
            res.status(200).json({
                success: true,
                message: "Orders fetched successfully",
                data: orders.rows
            });
        } catch (error) {
            next(error);
        }
    },
    createOrder: async (req, res, next) => {
        try {
            const order = await createOrder(req.body);
            res.status(200).json({
                success: true,
                message: "Order created successfully",
                data: order
            });
        } catch (error) {
            next(error);
        }
    },
    getOneOrder: async (req, res, next) => {
        try {

            const order = await getOneOrder(req.params);
            res.status(200).json({
                success: true,
                message: "Order fetched successfully",
                data: order
            });
        } catch (error) {
            next(error);
        }
    },
    updateOrder: async (req, res, next) => {
        try {
            const data = { ...req.body, ...req.params };
            const order = await updateOrder(data);
            res.status(200).json({
                success: true,
                message: "Order updated successfully"
            });
        }
        catch (error) {
            next(error);
        }
    },
}