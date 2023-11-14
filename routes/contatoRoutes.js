const express = require('express');
const router = express.Router();
const Contato = require('../models/contato');

// Rota para obter todos os contato
router.get('/', async (req, res) => {
  try {
    const contatos = await Contato.find();
    res.json(contatos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para obter um contato por ID
router.get('/:id', getContato, (req, res) => {
  res.json(res.contato);
});

// Rota para criar um novo contato
router.post('/', async (req, res) => {
  const contato = new Contato({
    nome: req.body.nome,
    email: req.body.email,
    descricao: req.body.descricao,
  });

  try {
    const newContato = await contato.save();
    res.status(201).json(newContato);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para atualizar um contato por ID
router.put('/:id', getContato, async (req, res) => {
  if (req.body.nome != null) {
    res.contato.nome = req.body.nome;
  }
  if (req.body.email != null) {
    res.contato.email = req.body.email;
  }
  if (req.body.descricao != null) {
    res.contato.descricao = req.body.descricao;
  }

  try {
    const updatedContato = await res.contato.save();
    res.json(updatedContato);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Rota para excluir um contato por ID
router.delete('/:id', getContato, async (req, res) => {
  try {
    await res.contato.deleteOne();
    res.json({ message: 'Contato- excluído com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getContato(req, res, next) {
  try {
    const contato = await Contato.findById(req.params.id);
    if (contato == null) {
      return res.status(404).json({ message: 'Contato não encontrado' });
    }
    res.contato = contato;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
