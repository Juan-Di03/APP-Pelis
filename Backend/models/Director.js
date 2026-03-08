const mongoose = require("mongoose");

const DirectorSchema = new mongoose.Schema({
  nombres: {
    type: String,
    required: true,
    trim: true
  },
  estado: {
    type: String,
    enum: ["Activo", "Inactivo"],
    default: "Activo"
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

// Actualizar fecha automáticamente cuando se edite
DirectorSchema.pre("save", function (next) {
  this.fechaActualizacion = Date.now();
  next();
});

module.exports = mongoose.model("Director", DirectorSchema);