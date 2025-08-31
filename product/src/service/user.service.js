const userModel = require('../model/user.model');

module.exports = {
    getAllUsers: async () => {
        try {
            return await userModel.findAndCountAll();
        } catch (error) {
            throw error
        }
    },
    createUser: async (user) => {
        try {
            return await userModel.create(user);
        } catch (error) {
            throw error
        }
    },
    getOneUser: async (data) => {
        try {
            let where = [];
            if (data.email) {
                where.push({ email: data.email })
            }
            if (data.id) {
                where.push({ id: data.id })
            }

            const user = await userModel.findOne({ where });
            if (!user) {
                throw new Error('User not found')
            }
            return user;
        } catch (error) {
            throw error
        }
    },
    updateUser: async (data) => {
        try {
            // console.log(data)
            if (!data.id) {
                throw new Error('Id is required')
            }
            const user = await userModel.findByPk(data.id);
            if (!user) {
                throw new Error('User not found')
            }
            return await user.update(data);
        } catch (error) {
            throw error
        }
    },
    deleteUser: async (data) => {
        try {
            // console.log(data)
            if (!data.id) {
                throw new Error('Id is required')
            }
            const user = await userModel.findByPk(data.id);
            if (!user) {
                throw new Error('User not found')
            }
            return await user.destroy(data);
        } catch (error) {
            throw error
        }
    }
}