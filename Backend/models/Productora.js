const {Schema, model} = require('mongoose');

const ProductoraSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true,
        trim: true
    },
    estado: {
        type: String,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
    },
     fechaCreacion: {
        type: Date,
        required: true,
        default: Date.now
    },
    fechaActualizacion: {
        type: Date,
        required: true,
        default: Date.now
    },
    slogan: {
        type: String,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },

     } );

module.exports = model('Productora', ProductoraSchema);