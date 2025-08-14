const { pool: db } = require('../config/db');

const Registration = {
  async create({ user_id, class_id }) {
    const result = await db.query(
      `INSERT INTO registrations (user_id, class_id) VALUES ($1, $2) RETURNING *`,
      [user_id, class_id]
    );
    return result.rows[0];
  },

  async findByUser(user_id) {
    const result = await db.query(
      `SELECT * FROM registrations WHERE user_id = $1`,
      [user_id]
    );
    return result.rows;
  },

  async findByClass(class_id) {
    const result = await db.query(
      `SELECT * FROM registrations WHERE class_id = $1`,
      [class_id]
    );
    return result.rows;
  },


};

module.exports = Registration;