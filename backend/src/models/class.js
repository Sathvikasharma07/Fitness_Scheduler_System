const { pool: db } = require('../config/db');

// Class model using raw SQL (PostgreSQL)
const Class = {
  async create({ title, description, date, duration, instructor }) {
    const result = await db.query(
      `INSERT INTO classes (title, description, date, duration, instructor)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, description, date, duration, instructor]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await db.query('SELECT * FROM classes ORDER BY date');
    return result.rows;
  },

  async findById(id) {
    const result = await db.query('SELECT * FROM classes WHERE id = $1', [id]);
    return result.rows[0];
  },

  async update(id, { title, description, date, duration, instructor }) {
    const result = await db.query(
      `UPDATE classes
       SET title = $1, description = $2, date = $3, duration = $4, instructor = $5
       WHERE id = $6
       RETURNING *`,
      [title, description, date, duration, instructor, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    await db.query('DELETE FROM classes WHERE id = $1', [id]);
    return { message: 'Class deleted' };
  }
};

module.exports = Class;