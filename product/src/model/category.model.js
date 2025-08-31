const { sequelize} = require('../config/db.config');
const {DataTypes} = require('sequelize');
const categoryModel = sequelize.define('categories', {
    id:{
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
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Image is required"
            }
        }
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1
    }
},
{
    tableName:"categories",
    timestamps: true,
    paranoid:true
}
);

module.exports =  categoryModel ;