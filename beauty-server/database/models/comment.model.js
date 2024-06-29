
import { DataTypes } from "sequelize";
import connection from "../db.connection.js";

export const commentModel = connection.define('comment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    content: {
        type: DataTypes.STRING,
        allowNull:false
    }
},
    {
    timestamps:true
    })


    connection.sync()


