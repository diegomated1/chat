import db from '../../database/database.js';
import { DataTypes } from 'sequelize';

export const Canal = db.define('canal', {
    id_canal: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    canal: DataTypes.STRING,
    id_servidor: DataTypes.INTEGER
},{
    freezeTableName: true,
    timestamps: false
});
