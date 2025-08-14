const { pool } = require('../config/db');

const SpecificClass = {
  async create({ name, description, instructor, class_date, start_time, duration, capacity }) {
    const result = await pool.query(
      `INSERT INTO specific_classes (name, description, instructor, class_date, start_time, duration, capacity)
       VALUES ($1, $2, $3, $4::date, $5, $6, $7)
       RETURNING *`,
      [name, description, instructor, class_date, start_time, duration, capacity]
    );
    return result.rows[0];
  },

  async getByDate(date) {
    const result = await pool.query(
      'SELECT * FROM specific_classes WHERE class_date = $1 ORDER BY start_time',
      [date]
    );
    return result.rows;
  },

  async addUserToClass(userId, classId) {
    const result = await pool.query(
      'INSERT INTO specific_class_registrations (user_id, class_id) VALUES ($1, $2) RETURNING *',
      [userId, classId]
    );
    return result.rows[0];
  },



  async getUserRegistrations(userId) {
    const result = await pool.query(`
      SELECT scr.*, sc.name, sc.description, sc.instructor, sc.class_date, 
             sc.start_time, sc.duration
      FROM specific_class_registrations scr
      JOIN specific_classes sc ON scr.class_id = sc.id
      WHERE scr.user_id = $1
      ORDER BY sc.class_date, sc.start_time
    `, [userId]);
    return result.rows;
  },

  async removeUserFromClass(userId, registrationId) {
    const result = await pool.query(
      'DELETE FROM specific_class_registrations WHERE user_id = $1 AND id = $2',
      [userId, registrationId]
    );
    return result.rowCount > 0;
  }
};

module.exports = SpecificClass;