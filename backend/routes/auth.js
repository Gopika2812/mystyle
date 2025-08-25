const express = require('express');
const User = require('../models/User');
require('dotenv').config();
const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ username });

    if (!user) {
      // If new user, create one
      user = new User({ username, password });
      await user.save();
    }

    return res.json({ message: 'Login successful', user });
  } catch (err) {
    console.error('Error saving user:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

