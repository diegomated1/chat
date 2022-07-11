import db from '../../database/database.js';
import { DataTypes } from 'sequelize';

export const Usuario_amigos = db.define('usuario_amigos', {
    id_usuario_amigos: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: DataTypes.INTEGER,
    id_amigo_usuario: DataTypes.INTEGER
},{
    freezeTableName: true,
    timestamps: false
});
