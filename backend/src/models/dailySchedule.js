const { pool } = require('../config/db');

const DailySchedule = {
  async getDailyClasses(date) {
    const dayOfWeek = new Date(date).getDay();
    const result = await pool.query(
      'SELECT * FROM daily_class_templates WHERE day_of_week = $1 ORDER BY start_time',
      [dayOfWeek]
    );
    return result.rows;
  },

  async getAllDailyClasses() {
    const result = await pool.query(
      'SELECT * FROM daily_class_templates ORDER BY day_of_week, start_time'
    );
    return result.rows;
  },

  async addToUserSchedule(userId, dailyClassId) {
    const result = await pool.query(
      'INSERT INTO user_schedules (user_id, daily_class_id) VALUES ($1, $2) RETURNING *',
      [userId, dailyClassId]
    );
    return result.rows[0];
  },



  async getUserSchedule(userId) {
    const result = await pool.query(`
      SELECT us.*, dct.name, dct.description, dct.instructor, dct.day_of_week, 
             dct.start_time, dct.duration
      FROM user_schedules us
      JOIN daily_class_templates dct ON us.daily_class_id = dct.id
      WHERE us.user_id = $1
      ORDER BY dct.day_of_week, dct.start_time
    `, [userId]);
    return result.rows;
  },

  async removeFromUserSchedule(userId, dailyClassId) {
    const result = await pool.query(
      'DELETE FROM user_schedules WHERE user_id = $1 AND daily_class_id = $2',
      [userId, dailyClassId]
    );
    return result.rowCount > 0;
  }

};

module.exports = DailySchedule;