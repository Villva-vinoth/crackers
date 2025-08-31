const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.config');

const orderModel = sequelize.define('orders', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    order_details: {
        type: DataTypes.JSON,
        allowNull: false
    },
    total_amount: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '0-processing, 1-OrderConfirmed, 2-Delivered, 3-completed, 4-Cancelled',
        defaultValue: 0
    },
    payment_status: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '0-Pending, 1-Success, 2-Failed',
        defaultValue: 0
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pincode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    noOfProducts: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    noOfItems: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}
    , {
        tableName: 'orders',
        timestamps: false,
        hooks: {
            beforeCreate: (order, options) => {
                const date = new Date();
                const year = date.getFullYear().toString().slice(-2);
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0');
                const randomNum = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
                order.order_id = `ORD${year}${month}${day}${randomNum}`;
            }
        }
    }
)

module.exports = orderModel;