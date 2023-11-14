const mongoose = require('mongoose');

const contatoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  }
});

const Contato = mongoose.model('Contato', contatoSchema);

module.exports = Contato;
