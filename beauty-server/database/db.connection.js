import {Sequelize} from "sequelize";

const connection = new Sequelize("beauty_review", 'root', '', {
    host:'localhost',
    dialect: 'mysql'
});


export default connection;