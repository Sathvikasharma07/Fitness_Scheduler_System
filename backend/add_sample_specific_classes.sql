-- Add sample specific classes for testing calendar functionality
-- These are one-time classes for specific dates

INSERT INTO specific_classes (name, description, instructor, class_date, start_time, duration, capacity) VALUES
-- This week's classes
('Morning Yoga Session', 'Special morning yoga class', 'Sarah Johnson', CURRENT_DATE, '07:00', 60, 15),
('HIIT Bootcamp Special', 'High-intensity interval training', 'Mike Davis', CURRENT_DATE + INTERVAL '1 day', '18:00', 45, 20),
('Pilates Workshop', 'Advanced pilates techniques', 'Emma Wilson', CURRENT_DATE + INTERVAL '2 days', '09:00', 90, 12),
('Dance Cardio Party', 'Fun dance cardio workout', 'Maria Garcia', CURRENT_DATE + INTERVAL '3 days', '19:00', 55, 25),
('Strength Training Intensive', 'Build muscle and strength', 'John Smith', CURRENT_DATE + INTERVAL '4 days', '17:30', 75, 18),

-- Next week's classes
('Weekend Yoga Retreat', 'Relaxing weekend yoga', 'Sarah Johnson', CURRENT_DATE + INTERVAL '7 days', '10:00', 120, 20),
('Spin Marathon', 'Extended indoor cycling', 'Mike Davis', CURRENT_DATE + INTERVAL '8 days', '18:30', 60, 16),
('Aqua Fitness Special', 'Water-based exercise', 'Lisa Brown', CURRENT_DATE + INTERVAL '9 days', '10:00', 50, 14),
('Zumba Fiesta', 'Latin dance fitness party', 'Maria Garcia', CURRENT_DATE + INTERVAL '10 days', '19:00', 75, 30),
('CrossFit Challenge', 'Full-body intense workout', 'John Smith', CURRENT_DATE + INTERVAL '11 days', '10:00', 90, 15);