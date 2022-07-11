import db from '../../database/database.js';
import { DataTypes } from 'sequelize';

export const Usuario = db.define('usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario: DataTypes.STRING,
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    contraseña: DataTypes.STRING
},{
    freezeTableName: true,
    timestamps: false
});
