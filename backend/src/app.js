require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB } = require('./config/db');
const classRoutes = require('./routes/classRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const authRoutes = require('./routes/auth');
const dailyScheduleRoutes = require('./routes/dailyScheduleRoutes');
const specificClassRoutes = require('./routes/specificClassRoutes');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the database
connectDB();

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/schedule', dailyScheduleRoutes);
app.use('/api/specific-classes', specificClassRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});