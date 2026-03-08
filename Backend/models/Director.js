const Director = require ("/Models/Director");
const {require,response, request} = require ("express");

const getDirector = async (req = request,res = response) =>{
    try {
        const Director = await Director.find();
        res.status(200).json(Director);

    }catch(error) {
        console.error ('❌ Error al obtener géneros:', error);
        res.status(500).json ({msg:"No se encontró ningun director"});
    }
    
}

const createDirector = async (req = request,res = response) => {
    try{
        const {Nombre,estado} = req.body;

        const DirectorDB = await Director.findOne();
        if(DirectorDB){
            return res.status(400).json({msg:"Ya se ha registrado un director principal"});

        }

        const Director = new Director({Nombres,estado,fechaCreación:new Date(),FechaActualización:New Date()});

        await Director.save();
        res.status(201).json(Director);
        
    }catch(error) {
        console.error("No se pudo registrar nuevo director",error);
        res.status(500).json({msg:"No se pudo guardar el director"});
    }
}

const updateDirector = async (req = request,res = response) =>{
    try{
        const {id} = req.params;
        const {Nombres,estado} = req.body;

        const Director = await Director.findByIdAndUpdate(
            id,
            {Nombres,estado,FechaActualización:new Date()},
            {new:true}
        );

        res.status(200).json(Director);
    }catch(error){
        console.error("No se pudo actualizar la información",error);
        res.status(500).json({msg:"Ocurrió un error"});
    }
    
}

module.exports = {
    getDirector,
    createDirector,
    updateDirector
};