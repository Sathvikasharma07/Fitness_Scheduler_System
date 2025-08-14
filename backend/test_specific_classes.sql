-- Add sample specific classes for testing calendar functionality
INSERT INTO specific_classes (name, description, instructor, class_date, start_time, duration, capacity) VALUES
('Morning Yoga Session', 'Special morning yoga class', 'Sarah Johnson', CURRENT_DATE, '07:00', 60, 15),
('HIIT Bootcamp Special', 'High-intensity interval training', 'Mike Davis', CURRENT_DATE + INTERVAL '1 day', '18:00', 45, 20),
('Pilates Workshop', 'Advanced pilates techniques', 'Emma Wilson', CURRENT_DATE + INTERVAL '2 days', '09:00', 90, 12),
('Dance Cardio Party', 'Fun dance cardio workout', 'Maria Garcia', CURRENT_DATE + INTERVAL '3 days', '19:00', 55, 25),
('Strength Training Intensive', 'Build muscle and strength', 'John Smith', CURRENT_DATE + INTERVAL '4 days', '17:30', 75, 18);