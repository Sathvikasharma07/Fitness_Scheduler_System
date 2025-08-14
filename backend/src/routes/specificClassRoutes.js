const express = require('express');
const router = express.Router();
const specificClassController = require('../controllers/specificClassController');
const { authenticateToken } = require('../middleware/auth');

// Get classes for specific date
router.get('/date/:date', specificClassController.getClassesByDate);

// Create new class for specific date
router.post('/', authenticateToken, specificClassController.createClass);

// User schedule routes (require authentication)
router.get('/my-schedule', authenticateToken, specificClassController.getUserSchedule);
router.post('/my-schedule', authenticateToken, specificClassController.addToSchedule);
router.delete('/my-schedule/:id', authenticateToken, specificClassController.removeFromSchedule);

module.exports = router;