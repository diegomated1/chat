import models from '../../models/models.js';


const AddCanal = async (req, res)=>{
    try{

        req.body.id_servidor = req.params.idservidor;
        
        var canal = await models.Canal.create(req.body);
        res.json({data: canal});

    }catch(err){
        res.json({error: err.message});
    }
}

const GetCanal = async (req, res)=>{
    try{

        if(req.params.idcanal===undefined){
            var canales = await models.Canal.findAll({
                where: {
                    id_servidor: req.params.idservidor
                }, raw: true, nest: true});
        }else{
            var canales = await models.Canal.findOne({
                where:{
                    id_canal: req.params.idcanal,
                    id_servidor: req.params.idservidor
                }, raw: true, nest: true
            });
        }

        res.json({data: canales});

    }catch(err){
        res.json({error: err.message});
    }
}

const EditarCanal = async (req, res)=>{
    try{

        var canales = await models.Canal.update(req.body, {
            where: {
                id_canal: req.params.idcanal
            }
        });

        res.json({data: canales});

    }catch(err){
        res.json({error: err.message});
    }
}

const DeleteCanal = async (req, res)=>{
    try{

        await models.Canal.destroy({
            where: {
                id_canal: req.params.idcanal
            }
        });

        res.json({message: "elimando"});

    }catch(err){
        res.json({error: err.message});
    }
}


export default {
    AddCanal: AddCanal,
    GetCanal: GetCanal,
    EditarCanal: EditarCanal,
    DeleteCanal: DeleteCanal
}

