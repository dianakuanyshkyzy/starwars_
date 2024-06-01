const express = require('express');
const router = express.Router();
const Planet = require('../models/Planet');

// Получить все планеты
router.get('/planets', async (req, res) => {
  try {
    const planets = await Planet.find();
    res.json(planets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Получить информацию о конкретной планете по ID
router.get('/planets/:id', async (req, res) => {
  try {
    const planet = await Planet.findById(req.params.id);
    res.json(planet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
