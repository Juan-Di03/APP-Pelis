const Media = require ("/Models/Media");
const Genero = require ("/Models/Genero");
const Director = require ("/Models/Director");
const Productora = require ("/Models/Productora");
const Tipo = require ("/Models/Tipo");
const {request,response} = require ("express");

const getMedias = async (req = request,res = response) =>{
    try{
        const Media = await Media.find().populate("Genero").populate("Director").populate("Productora").populate("Tipo");

        res.status(200).json(Medias);
                      
    }catch(error){
        console.error("Error al obtener medias",error);
        res.status(500).json ({msg:"No se pudo enlistar las producciones"});
    }
}

const createMedia = async (req = request,res = response) =>{
    try{
        const{serial,titulo,sinopsis,url,imagen,fechaEstreno,Genero,Director,Productora,Tipo} = req.body;

//Validar una unica serial
const serialDB = await Media.findOne({serial});
if (serialDB){
    return res.status(400).json({msg:"Esta serial ya existe"});
}

//Validar un único url
const urlDB = await Media.findOne({url});
if (urlDB){
    return res.status(400).json({msg:"Esta url ya existe"});
}

//Validar genero activo
const GeneroDB = await Genero.findById(Genero);
if (!GeneroDB || GeneroDB.estado !=="Activo"){
    return res.status(400).json({msg:"Debe seleccionar un genero que esté activo"});
}

//Validar productora activa
const ProductoraDB = await Productora.findById(Productora);
if (!ProductoraDB || ProductoraDB.estado !=="activo"){
    return res.status(400).json({msg:"Debe seleccionar una productora activa"});

}

//Validar tipo
const TipoDB = await Tipo.findById(Tipo);
if (!TipoDB){
    return res.status(400).json({msg:"Debe seleccionar un tipo valido"});
}

const Media = new Media ({serial,titulo,sinopsis,url,imagen,añoEstreno,Genero,Director,Productora,Tipo,fechaCreación:new Date(),fechaActualización:new Date()});

await Media.save();
res.status(201).json(Media);


    }catch(error){
        console.error("Error al guardar media",error);
        res.status(500).json({msg:"No se pudo guardar la producción"});
    }
}

const UpdateMedia = async (req = request,res = response) =>{
    try{
        const {id} = req.params;
        const Media = await Media.findByIdAndUpdate(
            id,
            {
                ...req.body,
                fechaActualización:new Date()

            },
            {new:true}
        );

        res.status(200).json(Media);
    }catch(error){
        console.error("Hubo un error al actualizar",error);
        res.status(500).json({msg:"No se pudo actualizar la producción"});
    }
}

const DeleteMedia = async (req = request,res = response) =>{
    try{
        const {id} = req.params;
        await Media.findByIdAndDelete(id);

        res.status(200).json({msg:"Producción eliminada"});
        
    }catch(error){
        console.error("No se pudo eliminar",error);
        res.status(500).json({msg:"Hubo un error al eliminar"});
    }
}

module.exports ={
    getMedias,
    createMedia,
    UpdateMedia,
    DeleteMedia
};