-- Add 10 sample fitness classes to daily_class_templates table

INSERT INTO daily_class_templates (name, description, instructor, day_of_week, start_time, duration, capacity) VALUES
-- Monday Classes
('Morning Yoga', 'Gentle yoga to start your week', 'Sarah Johnson', 1, '07:00', 60, 15),
('HIIT Bootcamp', 'High-intensity interval training', 'Mike Davis', 1, '18:00', 45, 20),

-- Tuesday Classes  
('Pilates Core', 'Core strengthening and flexibility', 'Emma Wilson', 2, '09:00', 50, 12),
('Cardio Dance', 'Fun dance cardio workout', 'Maria Garcia', 2, '19:00', 55, 25),

-- Wednesday Classes
('Strength Training', 'Build muscle and strength', 'John Smith', 3, '17:30', 60, 18),
('Meditation & Mindfulness', 'Relaxation and mental wellness', 'Sarah Johnson', 3, '08:00', 30, 20),

-- Thursday Classes
('Spin Class', 'Indoor cycling workout', 'Mike Davis', 4, '18:30', 45, 16),
('Aqua Fitness', 'Water-based exercise', 'Lisa Brown', 4, '10:00', 50, 14),

-- Friday Classes
('Zumba Party', 'Latin dance fitness', 'Maria Garcia', 5, '19:00', 60, 30),

-- Saturday Classes
('Weekend Warrior', 'Full-body intense workout', 'John Smith', 6, '10:00', 75, 20);