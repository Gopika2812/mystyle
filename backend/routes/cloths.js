const express = require('express');
const router = express.Router();
const Cloth = require('../models/Cloth');

// POST /cloth
router.post('/', async (req, res) => {
  try {
    console.log("Incoming cloth data:", req.body); // <--- debug
    const newCloth = new Cloth(req.body);
    const saved = await newCloth.save();
    console.log("Saved cloth:", saved);
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving cloth:", err);
    res.status(400).json({ message: err.message });
  }
});


// GET /cloth
router.get('/', async (req, res) => {
  try {
    const cloths = await Cloth.find();
    res.json(cloths);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
