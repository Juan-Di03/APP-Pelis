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

        const { Nombres, estado } = req.body;

        const DirectorDB = await Director.findOne();

        if (DirectorDB) {
            return res.status(400).json({ msg: "Ya se ha registrado un director principal" });
        }

        const director = new Director({
            Nombres,
            estado,
            fechaCreacion: new Date(),
            fechaActualizacion: new Date()
        });

        await director.save();

        res.status(201).json(director);

    } catch (error) {

        console.error("No se pudo registrar nuevo director", error);
        res.status(500).json({ msg: "No se pudo guardar el director" });

    }

}

const updateDirector = async (req = request, res = response) => {

    try {

        const { id } = req.params;
        const { Nombres, estado } = req.body;

        const directorActualizado = await Director.findByIdAndUpdate(
            id,
            {
                Nombres,
                estado,
                fechaActualizacion: new Date()
            },
            { new: true }
        );

        res.status(200).json(directorActualizado);

    } catch (error) {

        console.error("No se pudo actualizar la información", error);
        res.status(500).json({ msg: "Ocurrió un error" });

    }

}

module.exports = {
    getDirector,
    createDirector,
    updateDirector
};