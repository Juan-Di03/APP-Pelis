const Media = require('../models/Media');
const Genero = require('../models/Genero');
const Director = require('../models/Director');
const Productora = require('../models/Productora');

const { request, response } = require('express');

const getMedias = async (req = request, res = response) => {

    try {

        const medias = await Media.find()
            .populate('genero', 'nombre')
            .populate('director', 'nombres')
            .populate('productora', 'nombre')
            .populate('tipo', 'nombre');

        res.status(200).json(medias);

    } catch (error) {

        console.error('❌ Error al obtener medias:', error);

        res.status(500).json({
            msg: 'Error al listar medias'
        });

    }

};

const createMedia = async (req = request, res = response) => {

    try {

        const {
            serial,
            url,
            genero,
            director,
            productora
        } = req.body;

        // validar serial o url duplicados
        const mediaDB = await Media.findOne({
            $or: [
                { serial },
                { url }
            ]
        });

        if (mediaDB) {

            return res.status(400).json({
                msg: "El serial o la URL ya están registrados"
            });

        }

        // validar genero activo
        const generoDB = await Genero.findOne({
            _id: genero,
            estado: "Activo"
        });

        if (!generoDB) {

            return res.status(400).json({
                msg: "El género no existe o está inactivo"
            });

        }

        // validar director activo
        const directorDB = await Director.findOne({
            _id: director,
            estado: "Activo"
        });

        if (!directorDB) {

            return res.status(400).json({
                msg: "El director no existe o está inactivo"
            });

        }

        // validar productora activa
        const productoraDB = await Productora.findOne({
            _id: productora,
            estado: "Activo"
        });

        if (!productoraDB) {

            return res.status(400).json({
                msg: "La productora no existe o está inactiva"
            });

        }

        const media = new Media(req.body);

        await media.save();

        res.status(201).json(media);

    } catch (error) {

        console.error('❌ Error al crear media:', error);

        res.status(500).json({
            msg: 'Error al guardar media'
        });

    }

};

module.exports = {
    getMedias,
    createMedia
};