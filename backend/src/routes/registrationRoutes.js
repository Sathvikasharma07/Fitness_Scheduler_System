const express = require('express');
const Registration = require('../models/registrations');
const { authenticateJWT } = require('../middleware/auth');
const router = express.Router();

// Register for a class
router.post('/', authenticateJWT, async (req, res) => {
  try {
    const user_id = req.user.userId;
    const { class_id } = req.body;
    const registration = await Registration.create({ user_id, class_id });
    res.status(201).json(registration);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all registrations for the logged-in user
router.get('/my', authenticateJWT, async (req, res) => {
  try {
    const user_id = req.user.userId;
    const registrations = await Registration.findByUser(user_id);
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;