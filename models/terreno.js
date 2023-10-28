const mongoose = require('mongoose');

const terrenoSchema = new mongoose.Schema({
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
  caracteristica: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
    required: true,
  },
});

const Terreno = mongoose.model('Terreno', terrenoSchema);

module.exports = Terreno;
