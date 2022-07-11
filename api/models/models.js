import {Usuario} from './models/Usuario.js';
import {Usuario_amigos} from './models/Usuario_amigos.js';
import {Servidor} from './models/Servidor.js';
import {Canal} from './models/Canal.js';
import {Mensaje} from './models/Mensaje.js';
import {Servidores_usuario} from './models/Servidores_usuario.js';

Usuario_amigos.belongsTo(Usuario, {foreignKey: 'id_usuario'});
Usuario_amigos.belongsTo(Usuario, {foreignKey: 'id_amigo_usuario'});

Servidor.belongsTo(Usuario, {foreignKey: 'owner_servidor'});

Canal.belongsTo(Servidor, {foreignKey: 'id_servidor'});

Mensaje.belongsTo(Canal, {foreignKey: 'id_canal'});
Mensaje.belongsTo(Usuario, {foreignKey: 'id_usuario'});

Usuario.belongsToMany(Servidor, {
    through: Servidores_usuario,
    foreignKey: 'id_usuario'
});
Servidor.belongsToMany(Usuario, {
    through: Servidores_usuario,
    foreignKey: 'id_servidor'
});

export default {
    Usuario: Usuario,
    Usuario_amigos: Usuario_amigos,
    Servidor: Servidor,
    Canal: Canal,
    Mensaje: Mensaje,
    Servidores_usuario: Servidores_usuario
}



