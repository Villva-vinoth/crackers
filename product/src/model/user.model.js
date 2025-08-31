const { sequelize } = require('../config/db.config');
const { DataTypes } = require('sequelize');
const userModel = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Name is required"
            },
            min: {
                args: [3],
                msg: "Name should be atleast 3 characters"
            },
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: "Email is required"
            },
            isEmail: {
                msg: "Email is not valid"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Password is required"
            },
            min: {
                args: [6],
                msg: "Password should be atleast 6 characters"
            },
        }
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1
    }
},
    {
        tableName: "users",
        timestamps: true,
        paranoid: true,
        hooks: {
            beforeCreate: async (value) => {
                if (value.password) {
                    const brcypt = require('bcrypt');
                    const salt = await brcypt.genSalt(10);
                    value.password = await brcypt.hash(value.password, salt)
                }

            }
        }
    }
);

module.exports = userModel;