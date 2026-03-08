const Tipo = require ("/Models/Tipo");
const {require,response,request} = require ("express");

const getTipo = async (req = request,res = response) =>{
    try{
        const Tipos = await Tipo.find();
        res.status(200).json(Tipo);

    }catch(error){
        console.error("Ocurrió un error",error);
        res.status(500).json({msg:"No se encontró"});

    }
}

const createTipo = async (req = request,res = response) =>{
    try{
        const {nombre,descripción} = req.body;
        
        const TipoDB = await Tipo.findOne({nombre});
        if (TipoDB) {
            return res.status(400).json({msg:"Esta serie/pelicula ya existe"});
        }
         const Tipo = new Tipo({nombre,descripción,fechaCreación:new Date()});

         await Tipo.save();
         res.status(201).json(Tipo);

    }catch(error){
        console.error("No se pudo guardar",error);
        res.status(500).json({msg:"Ocurrió un error al guardar"});
    }
}

const updateTipo = async (req = request,res = response) =>{
    try{
        const {id} = req.params;
        const {nombre,descripción} = req.body;

        const Tipo = await Tipo.findByIdAndUpdate(
            id,
            {nombre,descripción,fechaActualiación:new Date()},
            {new:true}
        );

        res.status(200).json(Tipo);

    }catch(error){
        console.error("No se pudo actualizar",error);
        res.status(500).json({msg:"Hubo un error al actualizar,intente nuevamente"});
    }
}

module.exports = {
    getTipos,
    createTipo,
    updateTipo
    
}

