const orderModel = require('../model/order.model');

module.exports = {
    getAllOrders: async () => {
        try {
            return await orderModel.findAndCountAll({
                order: [['id', 'DESC']]
            });
        } catch (error) {
            throw error
        }
    },
    createOrder: async (order) => {
        try {
            return await orderModel.create(order);
        } catch (error) {
            throw error
        }
    },
    getOneOrder: async (data) => {
        try {
            if (!data.id) {
                throw new Error('Id is required')
            }

            const order = await orderModel.findByPk(data.id);
            if (!order) {
                throw new Error('order not found')
            }

            return order;
        } catch (error) {
            throw error
        }
    },
    updateOrder: async (data) => {
        try {
            if (!data.id) {
                throw new Error('Id is required')
            }
            const order = await orderModel.findByPk(data.id);
            if (!order) {
                throw new Error('order not found')
            }
            return await order.update(data);
        } catch (error) {
            throw error
        }
    },
    // deleteorder : async (data) => {
    //     try {
    //         if(!data.id) {
    //             throw new Error('Id is required')
    //         }
    //         const order = await orderModel.findByPk(data.id);
    //         if(!order) {
    //             throw new Error('order not found')
    //         }
    //         return await order.destroy(data);
    //     } catch (error) {
    //         throw error
    //     }
    // }
}