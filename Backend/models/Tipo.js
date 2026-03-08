const mongoose = require("mongoose");

const TipoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now
  }
});

// Actualizar fecha de actualización automáticamente
TipoSchema.pre("save", function(next) {
  this.fechaActualizacion = Date.now();
  next();
});

module.exports = mongoose.model("Tipo", TipoSchema);