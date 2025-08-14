const SpecificClass = require('../models/specificClass');

const specificClassController = {
  async getClassesByDate(req, res) {
    try {
      const { date } = req.params;
      const classes = await SpecificClass.getByDate(date);
      res.json(classes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async createClass(req, res) {
    try {
      const newClass = await SpecificClass.create(req.body);
      res.status(201).json(newClass);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async addToSchedule(req, res) {
    try {
      const { classId } = req.body;
      const userId = req.user.userId || req.user.id;
      const registration = await SpecificClass.addUserToClass(userId, classId);
      res.status(201).json(registration);
    } catch (error) {
      if (error.code === '23505') {
        return res.status(400).json({ message: 'Already registered for this class' });
      }
      res.status(500).json({ message: error.message });
    }
  },



  async getUserSchedule(req, res) {
    try {
      const userId = req.user.userId || req.user.id;
      const schedule = await SpecificClass.getUserRegistrations(userId);
      res.json(schedule);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async removeFromSchedule(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.userId || req.user.id;
      await SpecificClass.removeUserFromClass(userId, id);
      res.status(200).json({ message: 'Class removed from schedule' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = specificClassController;