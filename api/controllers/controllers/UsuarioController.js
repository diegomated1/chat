import models from '../../models/models.js';
import validator from 'validator';
import bc from 'bcrypt';

const Login = async (req, res)=>{
    try{

        var {credencial, contraseña} = req.body;

        if(validator.isEmail(credencial)){
            var usuario = await models.Usuario.findOne({
                where: {
                    correo: credencial
                }, raw: true, nest: true
            });
        }else{
            var usuario = await models.Usuario.findOne({
                where: {
                    usuario: credencial
                }, raw: true, nest: true
            });
        }

        if(usuario===null){
            return res.json({error: 1, message: 'Usuario no encontrado'});
        }

        var match = await bc.compare(contraseña.toString(), usuario.contraseña.toString());

        if(match){
            return res.json({error: 0, data: usuario});
        }else{
            return res.json({error: 2, message: 'Contraseña incorrecta'});
        }

    }catch(err){
        res.json({error: err.message});
    }
}

const Registrarse = async (req, res)=>{
    try{
        
        var {usuario, nombre, correo, contraseña} = req.body;

        var usuario_db1 = await models.Usuario.findAll({
            where: {usuario: usuario}
        });

        var usuario_db2 = await models.Usuario.findAll({
            where: {correo: correo}
        });

        if(usuario_db1.length>0){
            return res.json({error: 1, message: 'Nombre de usuario ya registrado'});
        }else if(usuario_db2.length>0){
            return res.json({error: 2, message: 'Correo ya registrado'});
        }

        var hash = await bc.hash(contraseña, 10);

        var usuario_c = await models.Usuario.create({
            usuario: usuario, nombre: nombre, correo: correo, contraseña: hash
        });

        res.json({error: 0, data: usuario_c});

    }catch(err){
        
        res.json({error: err.message});
    }
}

const GetUsuarios = async (req, res)=>{
    try{

        if(req.params.idusuario===undefined){
            var usuarios = await models.Usuario.findAll({raw: true, nest: true});
        }else{
            var usuarios = await models.Usuario.findOne({
                where: {id_usuario: req.params.idusuario},
                raw: true, nest: true
            });
        }

        res.json({usuarios: usuarios});

    }catch(err){
        res.json({error: err.message});
    }
}

const EditUsuarios = async (req, res)=>{
    try{

        if(req.body.contraseña!==undefined){
            req.body.contraseña = await bc.hash(req.body.contraseña, 10);
        }

        var usuario = await models.Usuario.update(req.body, {
            where: {
                id_usuario: req.params.idusuario
            }
        });

        res.json({data: usuario});

    }catch(err){
        res.json({error: err.message});
    }
}

const DeleteUsuarios = async (req, res)=>{
    try{

        await models.Usuario.destroy({
            where: {
                id_usuario: req.params.idusuario
            }
        });
        res.json({message: 'Usuario eliminado'});
    }catch(err){
        res.json({error: err.message});
    }
}

export default {
    Login: Login,
    Registrarse: Registrarse,
    GetUsuarios: GetUsuarios,
    EditUsuarios: EditUsuarios,
    DeleteUsuarios: DeleteUsuarios
}
