
import { DataTypes } from "sequelize";
import connection from "../db.connection.js";

export const productModel = connection.define('product', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull:false
    },
    description: {
        type: DataTypes.STRING(1500),
        allowNull: false,
    },

    image_path: {
        type: DataTypes.STRING(500),
        allowNull:false
    },
    price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull:false
    }
},
    {
    timestamps:true
    })

connection.sync()


