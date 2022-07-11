import {Sequelize} from 'sequelize';

const db = new Sequelize('chat', 'root', 'D1eg0987-', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

export default db;
