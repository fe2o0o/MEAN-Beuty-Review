
import { DataTypes } from "sequelize";
import connection from "../db.connection.js";


export const userModel = connection.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING(11),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull:false
    },
    password: {
        type: DataTypes.STRING(200),
        allowNull:false
    }
},
{
    timestamps:true
})


connection.sync()