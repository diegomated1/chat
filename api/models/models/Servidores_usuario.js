import db from '../../database/database.js';
import { DataTypes } from 'sequelize';

export const Servidores_usuario = db.define('servidores_usuario', {
    id_servidores_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: DataTypes.INTEGER,
    id_servidor: DataTypes.INTEGER
},{
    freezeTableName: true,
    timestamps: false
});
