const express = require('express');
const router = express.Router();
const Praga = require('../models/praga');

// Rota para obter todas as pragas
router.get('/', async (req, res) => {
  try {
    const pragas = await Praga.find();
    res.json(pragas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para obter uma praga por ID
router.get('/:id', getPraga, (req, res) => {
  res.json(res.praga);
});

// Rota para criar uma nova praga
router.post('/', async (req, res) => {
  const praga = new Praga({
    nome: req.body.nome,
    nome_cientifico: req.body.nome_cientifico,
    descricao: req.body.descricao,
    combate: req.body.combate,
    foto: req.body.foto,
  });

  try {
    const newPraga = await praga.save();
    res.status(201).json(newPraga);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para atualizar uma praga por ID
router.put('/:id', getPraga, async (req, res) => {
  if (req.body.nome != null) {
    res.planta.nome = req.body.nome;
  }
  if (req.body.nome_cientifico != null) {
    res.planta.nome_cientifico = req.body.nome_cientifico;
  }
  if (req.body.descricao != null) {
    res.planta.descricao = req.body.descricao;
  }
  if (req.body.combate != null) {
    res.planta.combate = req.body.combate;
  }
  if (req.body.foto != null) {
    res.planta.foto = req.body.foto;
  }

  try {
    const updatedPraga = await res.praga.save();
    res.json(updatedPraga);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Rota para excluir uma praga por ID
router.delete('/:id', getPraga, async (req, res) => {
  try {
    await res.praga.deleteOne();
    res.json({ message: 'Praga- excluída com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getPraga(req, res, next) {
  try {
    const praga = await Praga.findById(req.params.id);
    if (praga == null) {
      return res.status(404).json({ message: 'Praga não encontrada' });
    }
    res.praga = praga;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
