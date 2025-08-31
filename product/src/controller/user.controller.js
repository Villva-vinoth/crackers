const { getAllUsers, createUser, getOneUser, updateUser, deleteUser } = require('../service/user.service');
const bcrypt = require('bcrypt');
module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const User = await getAllUsers();
            res.status(200).json({
                success: true,
                message: "User fetched successfully",
                data: User.rows
            });
        } catch (error) {
            next(error);
        }
    },
    createUser: async (req, res, next) => {
        try {
            const User = await createUser(req.body);
            res.status(200).json({
                success: true,
                message: "User created successfully",
                data: User
            });
        } catch (error) {
            next(error);
        }
    },
    getOneUser: async (req, res, next) => {
        try {

            const User = await getOneUser(req.params);
            res.status(200).json({
                success: true,
                message: "User fetched successfully",
                data: User
            });
        } catch (error) {
            next(error);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const data = { ...req.body, ...req.params };
            const User = await updateUser(data);
            res.status(200).json({
                success: true,
                message: "User updated successfully"
            });
        }
        catch (error) {
            next(error);
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const data = req.params;
            const User = await deleteUser(data);
            res.status(200).json({
                success: true,
                message: "User deleted successfully"
            });
        } catch (error) {
            next(error)
        }
    },
    login: async (req, res, next) => {
        try {
            const data = req.body;
            const users = await getOneUser(data);
            // console.log(users)
            const checkPassword = await bcrypt.compare(data.password, users.dataValues.password);
            // console.log(checkPassword)
            if (!checkPassword) {
                return next("Invalid password");
            }
            res.status(200).json({
                success: true,
                message: "User logged in successfully",
                data: users
            });
        } catch (error) {
            next(error);
        }
    }
}