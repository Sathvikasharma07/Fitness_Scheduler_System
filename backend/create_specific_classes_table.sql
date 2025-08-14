-- Create table for specific date classes (not recurring)
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

-- Create user registrations for specific classes
CREATE TABLE IF NOT EXISTS specific_class_registrations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    class_id INTEGER REFERENCES specific_classes(id) ON DELETE CASCADE,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, class_id)
);