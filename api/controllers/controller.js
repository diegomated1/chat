import UsuarioController from './controllers/UsuarioController.js';
import ServidorController from './controllers/ServidorController.js';
import CanalController from './controllers/CanalController.js';
import MensajeController from './controllers/MensajeController.js';
import Servidores_usuariosController from './controllers/Servidores_usuariosController.js';

export default {
    Usuario: UsuarioController,
    Servidor: ServidorController,
    Canal: CanalController,
    Mensaje: MensajeController,
    Serv_User: Servidores_usuariosController
}

