-- Add new tables for daily schedule feature

-- Daily class templates (recurring classes)
CREATE TABLE daily_class_templates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    instructor VARCHAR(100) NOT NULL,
    day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0=Sunday, 6=Saturday
    start_time TIME NOT NULL,
    duration INTEGER NOT NULL, -- in minutes
    capacity INTEGER NOT NULL DEFAULT 20,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User's personal schedule
CREATE TABLE user_schedules (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    daily_class_id INTEGER REFERENCES daily_class_templates(id) ON DELETE CASCADE,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, daily_class_id)
);

-- Insert sample daily classes
INSERT INTO daily_class_templates (name, description, instructor, day_of_week, start_time, duration, capacity) VALUES
('Morning Yoga', 'Start your day with relaxing yoga', 'Sarah Johnson', 1, '07:00', 60, 15),
('HIIT Workout', 'High-intensity interval training', 'Mike Davis', 1, '18:00', 45, 20),
('Pilates', 'Core strengthening and flexibility', 'Emma Wilson', 2, '09:00', 50, 12),
('Cardio Blast', 'High-energy cardio session', 'John Smith', 2, '19:00', 40, 25),
('Strength Training', 'Build muscle and strength', 'Mike Davis', 3, '17:30', 60, 15),
('Meditation', 'Mindfulness and relaxation', 'Sarah Johnson', 4, '08:00', 30, 20),
('Zumba', 'Dance fitness class', 'Maria Garcia', 5, '18:30', 55, 30),
('Weekend Warrior', 'Intense full-body workout', 'John Smith', 6, '10:00', 75, 18);