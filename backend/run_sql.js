const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function createTables() {
    try {
        // Create specific_classes table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS specific_classes (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                description TEXT,
                instructor VARCHAR(100) NOT NULL,
                class_date DATE NOT NULL,
                start_time TIME NOT NULL,
                duration INTEGER NOT NULL,
                capacity INTEGER NOT NULL DEFAULT 20,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Create specific_class_registrations table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS specific_class_registrations (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                class_id INTEGER REFERENCES specific_classes(id) ON DELETE CASCADE,
                registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(user_id, class_id)
            );
        `);

        console.log('Tables created successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error creating tables:', error);
        process.exit(1);
    }
}

createTables();