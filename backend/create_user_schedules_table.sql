-- Create user_schedules table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_schedules (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    daily_class_id INTEGER REFERENCES daily_class_templates(id) ON DELETE CASCADE,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, daily_class_id)
);