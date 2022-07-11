import models from '../../models/models.js';


const JoinServidor = async (req, res)=>{
    try{

        req.body.id_servidor = req.params.idservidor;
        
        var servidores_usuario = await models.Servidores_usuario.create(req.body);

        res.json({data: servidores_usuario});

    }catch(err){
        res.json({error: err.message});
    }
}

const AddServidor = async (req, res)=>{
    try{

        var servidor = await models.Servidor.create(req.body);
        res.json({data: servidor});

    }catch(err){
        res.json({error: err.message});
    }
}

const GetServidor = async (req, res)=>{
    try{

        if(req.params.idservidor===undefined){
            var servidores = await models.Servidor.findAll({raw: true, nest: true});
        }else{
            var servidores = await models.Servidor.findOne({
                where:{
                    id_servidor: req.params.idservidor
                }, raw: true, nest: true
            });
        }

        res.json({data: servidores});

    }catch(err){
        res.json({error: err.message});
    }
}

const EditarServidor = async (req, res)=>{
    try{

        var servidor = await models.Servidor.update(req.body, {
            where: {
                id_servidor: req.params.idservidor
            }
        });

        res.json({data: servidor});

    }catch(err){
        res.json({error: err.message});
    }
}

const DeleteServidor = async (req, res)=>{
    try{

        await models.Servidor.destroy({
            where: {
                id_servidor: req.params.idservidor
            }
        });

        res.json({message: "elimando"});

    }catch(err){
        res.json({error: err.message});
    }
}


export default {
    JoinServidor: JoinServidor,
    AddServidor: AddServidor,
    GetServidor: GetServidor,
    EditarServidor: EditarServidor,
    DeleteServidor: DeleteServidor
}

