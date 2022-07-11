import db from '../../database/database.js';
import { DataTypes } from 'sequelize';

export const Mensaje = db.define('mensaje', {
    id_mensaje: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: DataTypes.INTEGER,
    mensaje: DataTypes.STRING,
    fecha_envio: DataTypes.DATE,
    id_canal: DataTypes.INTEGER
},{
    freezeTableName: true,
    timestamps: false
});
