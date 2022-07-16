import express from 'express';

// Routers
const LogRouter = express.Router();
const UsuarioRouter = express.Router();
const ServidorRouter = express.Router();
const CanalRouter = express.Router();
const MensajeRouter = express.Router();

// Controller import
import c from '../controllers/controller.js'

// Login and Logout
LogRouter.post('/login', c.Usuario.Login);
LogRouter.post('/registrarse', c.Usuario.Registrarse);

// User Router
UsuarioRouter.get('/', c.Usuario.GetUsuarios);
UsuarioRouter.get('/:idusuario', c.Usuario.GetUsuarios);
UsuarioRouter.put('/:idusuario', c.Usuario.EditUsuarios);
UsuarioRouter.delete('/:idusuario', c.Usuario.DeleteUsuarios);

// Server Router
ServidorRouter.post('/join/:idservidor', c.Servidor.JoinServidor);

ServidorRouter.get('/:idservidor/usuario', c.Serv_User.getUsuariosServidores);
ServidorRouter.get('/usuario/:idusuario', c.Serv_User.getServidoresUsuarios);
ServidorRouter.post('/:idservidor/usuario', c.Serv_User.addUsuarioServidor);

ServidorRouter.post('/', c.Servidor.AddServidor);
ServidorRouter.get('/', c.Servidor.GetServidor);
ServidorRouter.get('/:idservidor', c.Servidor.GetServidor);
ServidorRouter.put('/:idservidor', c.Servidor.EditarServidor);
ServidorRouter.delete('/:idservidor', c.Servidor.DeleteServidor);

// Canal Router
CanalRouter.post('/:idservidor/canal', c.Canal.AddCanal);
CanalRouter.get('/:idservidor/canal', c.Canal.GetCanal);
CanalRouter.get('/:idservidor/canal/:idcanal', c.Canal.GetCanal);
CanalRouter.put('/:idservidor/canal/:idcanal', c.Canal.EditarCanal);
CanalRouter.delete('/:idservidor/canal/:idcanal', c.Canal.DeleteCanal);

// Mensaje Router
MensajeRouter.post('/:idservidor/canal/:idcanal/mensaje', c.Mensaje.AddMensaje);
MensajeRouter.get('/:idservidor/canal/:idcanal/mensaje', c.Mensaje.GetMensaje);
MensajeRouter.get('/:idservidor/canal/:idcanal/mensaje/:idmensaje', c.Mensaje.GetMensaje);
MensajeRouter.put('/:idservidor/canal/:idcanal/mensaje/:idmensaje', c.Mensaje.EditarMensaje);
MensajeRouter.delete('/:idservidor/canal/:idcanal/mensaje/:idmensaje', c.Mensaje.DeleteMensaje);

export default {
    LogRouter: LogRouter,
    UsuarioRouter: UsuarioRouter,
    ServidorRouter: ServidorRouter,
    CanalRouter: CanalRouter,
    MensajeRouter: MensajeRouter
}
