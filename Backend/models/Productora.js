const Productora = require ("/Models/Productora");
const {require,response,request} = require ("express");

const getProductora = async (req = request,res = response) =>{
    try{
        const Productora = await Productora.find();
        res.status(200).json(Productora);
    }catch(error){
        console.error("No se pudo encontrar ninguna productora",error);
        res.status(500).json({msg:"Ocurrió un error al listar las productoras"});
    }
}

const createProductora = async (req = request,res = response) =>{
    try{
        const {nombre,estado,slogan,descripción} = req.body;

        const ProductoraDB = await Productora.findOne({nombre});
        if (ProductoraDB){
            return res.status(400).json({msg:"La productora ${nombre} ya existe"});
        }

        const Productora = new Productora ({nombre,estado,slogan,descripción,fechaCreación:new Date(),fechaActualización:new Date()});

        await Productora.save();
        res.status(201).json(Productora);

     }catch (error){
        console.error("Ocurrió un error",error);
        res.status(500).json({msg:"Error al guardar productora"});
     }
}

const updateProductora = async (req = request,res = response) =>{
    try{
        const {id} = req.params;
        const {nombre,estado,slogan,descripción} = req.body;

        const Productora = await Productora.findByIdAndUpdate(
            id,
            {nombre,estado,slogan,descripción,fechaActualización:new Date()},
            {new:true}
        );

        res.status(200).json(Productora);

    }catch(error){
        console.error("No se pudo actualizar la productora",error);
        res.status(500).json({msg:"Error al actualizar la prodcutora"});
    }
}

module.exports = {
    getProductora,
    createProductora,
    updateProductora

};