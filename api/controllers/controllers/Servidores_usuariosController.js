import models from '../../models/models.js';


const getServidoresUsuarios = async (req, res)=>{
    try{

        var usuario = await models.Usuario.findOne({
            where: {
                id_usuario: req.params.idusuario
            }, raw: true, nest: true
        });
        
        var servidores = await models.Servidor.findAll({
            include: {
                model: models.Usuario,
                through: {
                    attributes: []
                },
                where: {
                    id_usuario: req.params.idusuario
                },
                attributes: []
            }
        });

        res.json({usuario, servidores});

    }catch(err){
        res.json({error: err.message});
    }
}

const getUsuariosServidores = async (req, res)=>{
    try{
        
        var servidor = await models.Servidor.findOne({
            where: {
                id_servidor: req.params.idservidor
            }, raw: true, nest: true
        });

        var usuarios = await models.Usuario.findAll({
            include: {
                model: models.Servidor,
                attributes: [],
                through: {
                    attributes: []
                },
                where: {
                    id_servidor: req.params.idservidor
                }
            }, raw: true, nest: true
        });

        res.json({servidor, usuarios});

    }catch(err){
        res.json({error: err.message});
    }
}

const addUsuarioServidor = async (req, res)=>{
    try{

        var data = await models.Servidores_usuario.create({
            id_servidor: req.params.idservidor,
            id_usuario: req.body.id_usuario
        });

        res.json({data: data});
    }catch(err){
        res.json({error: err.message});
    }
}

export default {
    getServidoresUsuarios: getServidoresUsuarios,
    getUsuariosServidores: getUsuariosServidores,
    addUsuarioServidor: addUsuarioServidor
}
