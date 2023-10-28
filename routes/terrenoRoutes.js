const express = require('express');
const router = express.Router();
const Terreno = require('../models/terreno');

// Rota para obter todos os terrenos
router.get('/', async (req, res) => {
  try {
    const terrenos = await Terreno.find();
    res.json(terrenos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para obter um terreno por ID
router.get('/:id', getTerreno, (req, res) => {
  res.json(res.terreno);
});

// Rota para criar um novo terreno
router.post('/', async (req, res) => {
  const terreno = new Terreno({
    nome: req.body.nome,
    nome_cientifico: req.body.nome_cientifico,
    descricao: req.body.descricao,
    caracteristica: req.body.caracteristica,
    foto: req.body.foto,
  });

  try {
    const newTerreno = await terreno.save();
    res.status(201).json(newTerreno);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para atualizar um terreno por ID
router.put('/:id', getTerreno, async (req, res) => {
  if (req.body.nome != null) {
    res.planta.nome = req.body.nome;
  }
  if (req.body.nome_cientifico != null) {
    res.planta.nome_cientifico = req.body.nome_cientifico;
  }
  if (req.body.descricao != null) {
    res.planta.descricao = req.body.descricao;
  }
  if (req.body.caracteristica != null) {
    res.planta.caracteristica = req.body.caracteristica;
  }
  if (req.body.foto != null) {
    res.planta.foto = req.body.foto;
  }

  try {
    const updatedTerreno = await res.terreno.save();
    res.json(updatedTerreno);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Rota para excluir um terreno por ID
router.delete('/:id', getTerreno, async (req, res) => {
  try {
    await res.terreno.deleteOne();
    res.json({ message: 'Terreno- excluída com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getTerreno(req, res, next) {
  try {
    const terreno = await Terreno.findById(req.params.id);
    if (terreno == null) {
      return res.status(404).json({ message: 'Terreno não encontrado' });
    }
    res.terreno = terreno;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
