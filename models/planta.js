const mongoose = require('mongoose');

const plantaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  nome_cientifico: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  terreno: {
    type: String,
    required: true,
  },
  praga: {
    type: String,
    required: true,
  },
  cultivo: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
    required: true,
  },
});

const Planta = mongoose.model('Planta', plantaSchema);

module.exports = Planta;
