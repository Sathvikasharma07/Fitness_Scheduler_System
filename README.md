# Fitness Class Scheduler

A comprehensive full-stack web application for managing fitness classes with user authentication, class scheduling, and interactive calendar views.

## 🌟 Features

### Core Functionality
- **User Authentication**: Secure JWT-based login and registration system
- **Daily Schedule Management**: Browse and schedule fitness classes by specific dates
- **Interactive Calendar Views**: Weekly and monthly calendar displays with scheduled classes
- **Class Management**: Add/remove classes from personal schedule with real-time updates
- **Dynamic UI**: Responsive button states and instant calendar updates
- **Modern Design**: Clean, mobile-friendly interface with intuitive navigation

### User Experience
- **Three Main Views**:
  - **Daily Schedule**: Browse available classes and manage personal schedule
  - **Available Classes**: View all fitness classes in a comprehensive table
  - **Manage Classes**: Visual calendar interface for schedule management

## 🛠 Technology Stack

### Backend
- **Node.js** with Express.js framework
- **PostgreSQL** database with optimized queries
- **JWT** authentication with secure token management
- **bcrypt** password hashing for security
- **CORS** enabled for cross-origin requests

### Frontend
- **Angular 14+** with TypeScript
- **Angular Material** UI components
- **RxJS** for reactive programming and state management
- **Angular Router** for seamless navigation
- **Custom CSS** for responsive design

## 📁 Project Structure

```
fitness-class-scheduler/
├── backend/
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # API request handlers
│   │   ├── middleware/     # Authentication middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   └── utils/          # Utility functions
│   ├── .env               # Environment variables
│   └── package.json
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── components/ # UI components
    │   │   ├── services/   # HTTP services
    │   │   ├── guards/     # Route guards
    │   │   └── models/     # TypeScript interfaces
    │   ├── assets/        # Static assets
    │   └── styles.css     # Global styles
    └── package.json
```

## 🗄 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Daily Classes Table
```sql
CREATE TABLE daily_classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    instructor VARCHAR(100) NOT NULL,
    day_of_week INTEGER NOT NULL,
    start_time TIME NOT NULL,
    duration INTEGER NOT NULL,
    capacity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Specific Classes Table
```sql
CREATE TABLE specific_classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    instructor VARCHAR(100) NOT NULL,
    class_date DATE NOT NULL,
    start_time TIME NOT NULL,
    duration INTEGER NOT NULL,
    capacity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### User Registrations Table
```sql
CREATE TABLE specific_class_registrations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    class_id INTEGER REFERENCES specific_classes(id) ON DELETE CASCADE,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, class_id)
);
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- Angular CLI (v14 or higher)

### Backend Setup
1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment file** (`.env`):
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=fitness_scheduler
   DB_USER=your_username
   DB_PASSWORD=your_password
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. **Set up PostgreSQL database**:
   - Create database: `fitness_scheduler`
   - Run SQL scripts to create tables
   - Add sample data if needed

5. **Start the server**:
   ```bash
   npm start
   ```
   Server runs on `http://localhost:3000`

### Frontend Setup
1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   ng serve
   ```

4. **Access application**:
   Open browser to `http://localhost:4200`

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Class Management
- `GET /api/schedule/daily-classes/:date` - Get classes for specific date
- `POST /api/specific-classes` - Create specific class instance
- `GET /api/specific-classes/my-schedule` - Get user's scheduled classes
- `POST /api/specific-classes/my-schedule` - Add class to user schedule
- `DELETE /api/specific-classes/my-schedule/:id` - Remove class from schedule

## 🎯 Key Components

### Daily Schedule Component
- **Date Selection**: Choose specific dates to view available classes
- **Class Cards**: Visual display of class information
- **Schedule Management**: Add/remove classes with dynamic button states
- **Real-time Updates**: Instant UI updates after schedule changes

### Available Classes Component
- **Comprehensive Table**: View all available fitness classes
- **Class Information**: Name, description, day, time, duration, instructor, capacity
- **Read-only View**: Browse classes without scheduling actions

### Manage Schedule Component
- **Calendar Views**: Toggle between weekly and monthly displays
- **Visual Schedule**: See scheduled classes directly on calendar
- **Interactive Management**: Remove classes directly from calendar
- **Navigation**: Browse different weeks/months easily

### Authentication Components
- **Login/Register Forms**: Secure user authentication
- **JWT Token Management**: Automatic token handling
- **Route Protection**: Secure access to protected features

## ✨ Features in Detail

### Class Scheduling System
- **Browse Classes**: View available classes by date
- **Smart Scheduling**: Add classes to personal schedule for specific dates
- **Duplicate Prevention**: Automatic prevention of duplicate registrations
- **Schedule Management**: Easy removal of scheduled classes

### Calendar Interface
- **Weekly View**: 7-day calendar with detailed class information
- **Monthly View**: Full month overview with class indicators
- **Class Display**: Shows class name, time, and instructor
- **Interactive Navigation**: Previous/next navigation for both views
- **Visual Indicators**: Color-coded display for scheduled classes

### User Interface Design
- **Responsive Layout**: Works seamlessly on desktop and mobile
- **Modern Styling**: Clean, professional design
- **Intuitive Navigation**: Easy switching between different views
- **Real-time Feedback**: Instant updates without page refresh

## 🔧 Development Notes

### Date Handling
- **Timezone Management**: Proper handling of date/time across different timezones
- **Consistent Formatting**: Uniform date display throughout the application
- **Local Date Construction**: Avoids timezone conversion issues

### State Management
- **Component Communication**: Event-driven updates between components
- **Change Detection**: Optimized Angular change detection
- **Real-time Sync**: Automatic synchronization of schedule data

### Security Implementation
- **JWT Authentication**: Secure token-based authentication
- **Password Security**: bcrypt hashing for password storage
- **Route Protection**: Authentication guards for protected routes
- **Input Validation**: Server-side validation and sanitization

## 🐛 Troubleshooting

### Common Issues & Solutions

1. **Database Connection Issues**
   - Verify PostgreSQL service is running
   - Check database credentials in `.env` file
   - Ensure database exists and tables are created

2. **CORS Errors**
   - Verify backend CORS configuration
   - Check frontend API base URL
   - Ensure both servers are running on correct ports

3. **Date Display Issues**
   - Check system timezone settings
   - Verify date formatting in components
   - Clear browser cache if dates appear incorrect

4. **Authentication Problems**
   - Verify JWT secret is set in environment
   - Check token expiration settings
   - Clear localStorage if login issues persist

## 🔮 Future Enhancements

### Planned Features
- **Email Notifications**: Automated reminders for scheduled classes
- **Class Capacity Management**: Real-time capacity tracking and waitlists
- **Instructor Dashboard**: Interface for instructors to manage their classes
- **Mobile Application**: Native mobile app for iOS and Android
- **Payment Integration**: Online payment system for class bookings
- **Rating System**: User reviews and ratings for classes
- **Advanced Filtering**: Search and filter classes by various criteria
- **Social Features**: User profiles and social sharing capabilities

### Technical Improvements
- **Performance Optimization**: Enhanced loading times and caching
- **Offline Support**: Progressive Web App capabilities
- **Advanced Analytics**: Usage statistics and reporting
- **Multi-language Support**: Internationalization features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support and questions, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ using Angular and Node.js**