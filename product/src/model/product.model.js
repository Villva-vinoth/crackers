const { sequelize } = require('../config/db.config');
const { DataTypes } = require('sequelize');
const productModel = sequelize.define('products', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.STRING,
        allowNull: true
    },
    discount: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
        tableName: "products",
        timestamps: true,
        paranoid: true
    }
);

module.exports = productModel;