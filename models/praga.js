const mongoose = require('mongoose');

const pragaSchema = new mongoose.Schema({
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
  combate: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
    required: true,
  },
});

const Praga = mongoose.model('Praga', pragaSchema);

module.exports = Praga;
