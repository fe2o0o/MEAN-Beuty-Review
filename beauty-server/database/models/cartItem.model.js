import { DataTypes } from "sequelize";
import connection from "../db.connection.js";

export const cartItemModel = connection.define("cartItem", {
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue:1
    }
});


connection.sync();