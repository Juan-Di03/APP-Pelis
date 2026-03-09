const Director = require("../models/Director");
const { response, request } = require("express");

const getDirector = async (req = request, res = response) => {
    try {

        const directores = await Director.find();

        res.status(200).json(directores);

    } catch (error) {

        console.error('❌ Error al obtener directores:', error);
        res.status(500).json({ msg: "No se encontró ningún director" });

    }
}

const createDirector = async (req = request, res = response) => {

    try {

        const { nombres, estado } = req.body;

        const directorDB = await Director.findOne({ nombres });

        if (directorDB) {
            return res.status(400).json({
                msg: "Este director ya existe"
            });
        }

        const director = new Director({
            nombres,
            estado,
            fechaCreacion: new Date(),
            fechaActualizacion: new Date()
        });

        await director.save();

        res.status(201).json(director);

    } catch (error) {

        console.error("❌ No se pudo registrar nuevo director", error);

        res.status(500).json({
            msg: "No se pudo guardar el director",
            error: error.message
        });

    }

}

const updateDirector = async (req = request, res = response) => {

    try {

        const { id } = req.params;
        const { nombres, estado } = req.body;

        const directorActualizado = await Director.findByIdAndUpdate(
            id,
            {
                nombres,
                estado,
                fechaActualizacion: new Date()
            },
            { new: true }
        );

        res.status(200).json(directorActualizado);

    } catch (error) {

        console.error("❌ No se pudo actualizar la información", error);

        res.status(500).json({
            msg: "Ocurrió un error"
        });

    }

}

module.exports = {
    getDirector,
    createDirector,
    updateDirector
};