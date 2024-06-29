import { DataTypes } from "sequelize";
import connection from "../db.connection.js";

export const cartModel = connection.define('cart', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    cart_status: {
        type: DataTypes.ENUM,
        values: ['open', 'checkout'],
        defaultValue: 'open',
        allowNull:false
    }
})



connection.sync()