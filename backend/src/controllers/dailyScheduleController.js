const DailySchedule = require('../models/dailySchedule');

const dailyScheduleController = {
  async getDailyClasses(req, res) {
    try {
      const { date } = req.params;
      const classes = await DailySchedule.getDailyClasses(date);
      res.json(classes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getAllDailyClasses(req, res) {
    try {
      const classes = await DailySchedule.getAllDailyClasses();
      res.json(classes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async addToSchedule(req, res) {
    try {
      const { dailyClassId } = req.body;
      const userId = req.user.userId || req.user.id;
      await DailySchedule.addToUserSchedule(userId, dailyClassId);
      // Fetch updated schedule for the user
      const schedule = await DailySchedule.getUserScheduleForDate(userId, req.body.class_date || req.body.date);
      res.status(201).json(schedule);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },



  async getUserSchedule(req, res) {
    try {
      const userId = req.user.userId || req.user.id;
      const schedule = await DailySchedule.getUserSchedule(userId);
      res.json(schedule);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async removeFromSchedule(req, res) {
    try {
      const { dailyClassId } = req.params;
      const userId = req.user.userId || req.user.id;
      await DailySchedule.removeFromUserSchedule(userId, dailyClassId);
      res.status(200).json({ message: 'Class removed from schedule' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

};

module.exports = dailyScheduleController;