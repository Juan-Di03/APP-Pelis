const Tipo = require("../models/Tipo");
const { response, request } = require("express");

const getTipo = async (req = request, res = response) => {

    try {

        const tipos = await Tipo.find();

        res.status(200).json(tipos);

    } catch (error) {

        console.error("❌ Ocurrió un error", error);

        res.status(500).json({
            msg: "Error al obtener tipos"
        });

    }

};

const createTipo = async (req = request, res = response) => {

    try {

        const { nombre, descripcion } = req.body;

        const tipoDB = await Tipo.findOne({
            nombre: nombre.toLowerCase()
        });

        if (tipoDB) {

            return res.status(400).json({
                msg: "Este tipo ya existe"
            });

        }

        const tipo = new Tipo({
            nombre: nombre.toLowerCase(),
            descripcion
        });

        await tipo.save();

        res.status(201).json(tipo);

    } catch (error) {

        console.error("❌ No se pudo guardar", error);

        res.status(500).json({
            msg: "Ocurrió un error al guardar"
        });

    }

};

const updateTipo = async (req = request, res = response) => {

    try {

        const { id } = req.params;
        const { nombre, descripcion } = req.body;

        const tipoActualizado = await Tipo.findByIdAndUpdate(
            id,
            {
                nombre,
                descripcion
            },
            { new: true }
        );

        if (!tipoActualizado) {

            return res.status(404).json({
                msg: "Tipo no encontrado"
            });

        }

        res.status(200).json(tipoActualizado);

    } catch (error) {

        console.error("❌ No se pudo actualizar", error);

        res.status(500).json({
            msg: "Hubo un error al actualizar"
        });

    }

};

module.exports = {
    getTipo,
    createTipo,
    updateTipo
};