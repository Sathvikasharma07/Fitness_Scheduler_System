const express = require('express');
const router = express.Router();
const dailyScheduleController = require('../controllers/dailyScheduleController');
const { authenticateToken } = require('../middleware/auth');

// Get all daily classes
router.get('/daily-classes', dailyScheduleController.getAllDailyClasses);

// Get classes for specific date (YYYY-MM-DD)
router.get('/daily-classes/:date', dailyScheduleController.getDailyClasses);

// User schedule routes (require authentication)
router.get('/my-schedule', authenticateToken, dailyScheduleController.getUserSchedule);
router.post('/my-schedule', authenticateToken, dailyScheduleController.addToSchedule);
router.delete('/my-schedule/:dailyClassId', authenticateToken, dailyScheduleController.removeFromSchedule);

module.exports = router;