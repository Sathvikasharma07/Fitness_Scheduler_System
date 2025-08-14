// User model using raw SQL (PostgreSQL) with Node.js 'pg' client

const { pool: db } = require('../config/db');

// User table schema (for reference)
// id: SERIAL PRIMARY KEY
// name: VARCHAR
// email: VARCHAR (unique)
// password: VARCHAR

const User = {
  async create({ name, email, password }) {
    const result = await db.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, password]
    );
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  },

  async findById(id) {
    const result = await db.query(
      'SELECT id, name, email FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }
};

module.exports = User;