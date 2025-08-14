# Daily Schedule Feature Setup

## Database Setup

1. **Run the database update script:**
   ```bash
   cd backend
   psql -U your_username -d fitness_scheduler -f database_update.sql
   ```

2. **Or manually execute the SQL commands:**
   ```sql
   -- Connect to your PostgreSQL database and run:
   
   -- Daily class templates (recurring classes)
   CREATE TABLE daily_class_templates (
       id SERIAL PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       description TEXT,
       instructor VARCHAR(100) NOT NULL,
       day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
       start_time TIME NOT NULL,
       duration INTEGER NOT NULL,
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

   -- Insert sample data
   INSERT INTO daily_class_templates (name, description, instructor, day_of_week, start_time, duration, capacity) VALUES
   ('Morning Yoga', 'Start your day with relaxing yoga', 'Sarah Johnson', 1, '07:00', 60, 15),
   ('HIIT Workout', 'High-intensity interval training', 'Mike Davis', 1, '18:00', 45, 20),
   ('Pilates', 'Core strengthening and flexibility', 'Emma Wilson', 2, '09:00', 50, 12),
   ('Cardio Blast', 'High-energy cardio session', 'John Smith', 2, '19:00', 40, 25),
   ('Strength Training', 'Build muscle and strength', 'Mike Davis', 3, '17:30', 60, 15),
   ('Meditation', 'Mindfulness and relaxation', 'Sarah Johnson', 4, '08:00', 30, 20),
   ('Zumba', 'Dance fitness class', 'Maria Garcia', 5, '18:30', 55, 30),
   ('Weekend Warrior', 'Intense full-body workout', 'John Smith', 6, '10:00', 75, 18);
   ```

## Backend Setup

The following files have been created/updated:
- `src/models/dailySchedule.js` - Database operations for daily schedules
- `src/controllers/dailyScheduleController.js` - API controllers
- `src/routes/dailyScheduleRoutes.js` - API routes
- `src/app.js` - Updated to include new routes

## Frontend Setup

The following files have been created/updated:
- `src/app/models/daily-schedule.model.ts` - TypeScript interfaces
- `src/app/services/daily-schedule.service.ts` - HTTP service
- `src/app/components/daily-schedule/` - New component files
- `src/app/app.module.ts` - Updated to include new component
- `src/app/app.component.*` - Updated with tab navigation

## API Endpoints

### Available Endpoints:
- `GET /api/schedule/daily-classes` - Get all daily classes
- `GET /api/schedule/daily-classes/:day` - Get classes for specific day (0=Sunday, 6=Saturday)
- `GET /api/schedule/my-schedule` - Get user's personal schedule (requires auth)
- `POST /api/schedule/my-schedule` - Add class to user's schedule (requires auth)
- `DELETE /api/schedule/my-schedule/:dailyClassId` - Remove class from schedule (requires auth)

## How to Use

1. **Start the backend server:**
   ```bash
   cd backend
   npm start
   ```

2. **Start the frontend server:**
   ```bash
   cd frontend
   ng serve
   ```

3. **Access the application:**
   - Open http://localhost:4200
   - Login/Register
   - Click on "Daily Schedule" tab
   - Select a day to view available classes
   - Add classes to your personal schedule
   - View your weekly schedule at the bottom

## Features

- **Daily Class View**: See all available classes for each day of the week
- **Personal Schedule**: Add/remove classes from your personal weekly schedule
- **Day Navigation**: Switch between different days to see available classes
- **Real-time Updates**: Schedule updates immediately when adding/removing classes
- **Responsive Design**: Works on desktop and mobile devices