const express = require('express');
const router = express.Router();
const Planta = require('../models/planta');

// Rota para obter todos os contatos
router.get('/', async (req, res) => {
  try {
    const plantas = await Planta.find();
    res.json(plantas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para obter um contato por ID
router.get('/:id', getPlanta, (req, res) => {
  res.json(res.planta);
});

// Rota para criar um novo contato
router.post('/', async (req, res) => {
  const planta = new Planta({
    nome: req.body.nome,
    descricao: req.body.email,
    terreno: req.body.telefone,
    praga: req.body.endereco,
    foto: req.body.foto,
  });

  try {
    const newPlanta = await planta.save();
    res.status(201).json(newPlanta);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para atualizar um contato por ID
router.put('/:id', getPlanta, async (req, res) => {
  if (req.body.nome != null) {
    res.planta.nome = req.body.nome;
  }
  if (req.body.descricao != null) {
    res.planta.descricao = req.body.descricao;
  }
  if (req.body.terreno != null) {
    res.planta.terreno = req.body.terreno;
  }
  if (req.body.praga != null) {
    res.planta.praga = req.body.praga;
  }
  if (req.body.foto != null) {
    res.planta.foto = req.body.foto;
  }

  try {
    const updatedPlanta = await res.planta.save();
    res.json(updatedPlanta);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para excluir um contato por ID
router.delete('/:id', getPlanta, async (req, res) => {
  try {
    await res.planta.remove();
    res.json({ message: 'Planta excluída com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getPlanta(req, res, next) {
  try {
    const planta = await Planta.findById(req.params.id);
    if (planta == null) {
      return res.status(404).json({ message: 'Planta não encontrada' });
    }
    res.planta = planta;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
