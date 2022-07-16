import models from '../../models/models.js';


const AddMensaje = async (req, res)=>{
    try{

        req.body.id_canal = req.params.idcanal;
        
        var mensaje = await models.Mensaje.create(req.body);
        res.json({data: mensaje});

    }catch(err){
        res.json({error: err.message});
    }
}

const GetMensaje = async (req, res)=>{
    try{

        if(req.params.idmensaje===undefined){
            var mensajes = await models.Mensaje.findAll({
                where: {
                    id_canal: req.params.idcanal
                }, raw: true, nest: true});
        }else{
            var mensajes = await models.Mensaje.findOne({
                where:{
                    id_canal: req.params.idcanal,
                    id_mensaje: req.params.idmensaje
                }, raw: true, nest: true
            });
        }
        
        res.json({data: mensajes});

    }catch(err){
        res.json({error: err.message});
    }
}

const EditarMensaje = async (req, res)=>{
    try{

        var mensaje = await models.Mensaje.update(req.body, {
            where: {
                id_mensaje: req.params.idmensaje
            }
        });

        res.json({data: mensaje});

    }catch(err){
        res.json({error: err.message});
    }
}

const DeleteMensaje = async (req, res)=>{
    try{

        await models.Mensaje.destroy({
            where: {
                id_mensaje: req.params.idmensaje
            }
        });

        res.json({message: "elimando"});

    }catch(err){
        res.json({error: err.message});
    }
}

export default {
    AddMensaje: AddMensaje,
    GetMensaje: GetMensaje,
    EditarMensaje: EditarMensaje,
    DeleteMensaje: DeleteMensaje
}

