# Fitness Class Scheduler - Project Creation Guide

This guide provides step-by-step instructions for creating the Fitness Class Scheduler project from scratch.

## Phase 1: Project Initialization

### 1.1 Create Project Structure
```bash
mkdir fitness-class-scheduler
cd fitness-class-scheduler
```

### 1.2 Initialize Git Repository
```bash
git init
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
echo "dist/" >> .gitignore
```

## Phase 2: Backend Development

### 2.1 Initialize Backend
```bash
mkdir backend
cd backend
npm init -y
```

### 2.2 Install Backend Dependencies
```bash
# Production dependencies
npm install express cors helmet morgan bcryptjs jsonwebtoken pg winston dotenv

# Development dependencies
npm install -D nodemon
```

### 2.3 Create Backend Structure
```bash
mkdir src
mkdir src/config src/controllers src/middleware src/models src/routes src/utils
```

### 2.4 Create Package.json Scripts
Update `backend/package.json`:
```json
{
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

### 2.5 Create Core Backend Files

#### Database Configuration (`src/config/db.js`)
```javascript
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = pool;
```

#### Logger Utility (`src/utils/logger.js`)
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'fitness-scheduler' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
```

#### Authentication Middleware (`src/middleware/auth.js`)
```javascript
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      logger.error('Token verification failed:', err);
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
```

#### Error Handler Middleware (`src/middleware/errorHandler.js`)
```javascript
const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.status(500).json({ message: 'Internal server error' });
};

module.exports = errorHandler;
```

#### Main App File (`src/app.js`)
```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const classRoutes = require('./routes/classRoutes');
const authRoutes = require('./routes/auth');
const registrationRoutes = require('./routes/registrationRoutes');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/registrations', registrationRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
```

### 2.6 Create Environment File
Create `backend/.env`:
```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fitness_scheduler
DB_USER=your_username
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## Phase 3: Database Setup

### 3.1 Create PostgreSQL Database
```sql
CREATE DATABASE fitness_scheduler;
```

### 3.2 Create Database Tables
```sql
-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Classes table
CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    instructor VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    duration INTEGER NOT NULL,
    capacity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Registrations table
CREATE TABLE registrations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    class_id INTEGER REFERENCES classes(id) ON DELETE CASCADE,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, class_id)
);
```

## Phase 4: Frontend Development

### 4.1 Create Angular Application
```bash
cd ..  # Back to project root
ng new frontend --routing --style=css
cd frontend
```

### 4.2 Install Angular Dependencies
```bash
ng add @angular/material
npm install @angular/common @angular/forms
```

### 4.3 Generate Angular Components and Services
```bash
# Components
ng generate component components/login
ng generate component components/register
ng generate component components/class-list
ng generate component components/class-form

# Services
ng generate service services/auth
ng generate service services/class

# Guards
ng generate guard guards/auth

# Models
mkdir src/app/models
```

### 4.4 Configure Angular Material
Update `src/app/app.module.ts` to include Material modules:
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    // Add your components here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Phase 5: Implementation Details

### 5.1 Backend Models
Create data models for User, Class, and Registration entities with proper validation and database interaction methods.

### 5.2 Backend Controllers
Implement controllers for:
- Authentication (login, register)
- Class management (CRUD operations)
- Registration management

### 5.3 Backend Routes
Set up Express routes for all API endpoints with proper middleware integration.

### 5.4 Frontend Services
Create Angular services for:
- HTTP communication with backend
- Authentication state management
- Class data management

### 5.5 Frontend Components
Develop Angular components for:
- User authentication (login/register)
- Class listing and filtering
- Class creation and editing
- User registration management

## Phase 6: Testing and Deployment

### 6.1 Testing Setup
```bash
# Backend testing
cd backend
npm install -D jest supertest
npm test

# Frontend testing
cd frontend
ng test
```

### 6.2 Build for Production
```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
ng build --prod
```

## Phase 7: Additional Features

### 7.1 Add Advanced Features
- Email notifications
- Calendar integration
- Payment processing
- Advanced filtering and search
- User profiles and preferences

### 7.2 Performance Optimization
- Database indexing
- Caching strategies
- Code splitting
- Lazy loading

### 7.3 Security Enhancements
- Rate limiting
- Input sanitization
- HTTPS configuration
- Security headers

## Conclusion

This guide provides a comprehensive approach to creating the Fitness Class Scheduler from scratch. Each phase builds upon the previous one, ensuring a solid foundation and scalable architecture. Follow the phases sequentially for the best results, and customize the implementation based on your specific requirements.