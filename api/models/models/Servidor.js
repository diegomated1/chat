import db from '../../database/database.js';
import { DataTypes } from 'sequelize';

export const Servidor = db.define('servidor', {
    id_servidor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    servidor: DataTypes.STRING,
    owner_servidor: DataTypes.INTEGER
},{
    freezeTableName: true,
    timestamps: false
});
