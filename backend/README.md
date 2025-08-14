# Fitness Class Scheduler Backend

## Overview
The Fitness Class Scheduler backend is built using Node.js and Express. It provides a RESTful API for managing gym classes, including features such as JWT-based authentication, CRUD operations, and error handling.

## Features
- **JWT-based Authentication**: Secure endpoints with JSON Web Tokens.
- **CRUD Operations**: Create, Read, Update, and Delete gym classes.
- **Filterable Tables**: Easily filter and manage class listings.
- **Error Handling**: Comprehensive error handling middleware.
- **Logging**: Utilizes Winston for logging actions and errors.
- **Form Validation**: Ensures data integrity through validation.

## Project Structure
```
backend
├── src
│   ├── app.js                # Entry point of the application
│   ├── controllers           # Contains controller logic for handling requests
│   │   └── classController.js
│   ├── middleware            # Middleware for authentication and error handling
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models               # Database models
│   │   └── class.js
│   ├── routes               # API routes
│   │   └── classRoutes.js
│   ├── utils                # Utility functions
│   │   └── logger.js
│   └── config               # Configuration files
│       └── db.js
├── package.json             # Project metadata and dependencies
└── README.md                # Documentation for the backend
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the backend directory:
   ```
   cd fitness-class-scheduler/backend
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage
1. Start the server:
   ```
   npm start
   ```
2. The API will be available at `http://localhost:3000`.

## API Endpoints
- `POST /api/classes` - Create a new class
- `GET /api/classes` - Retrieve all classes
- `GET /api/classes/:id` - Retrieve a specific class
- `PUT /api/classes/:id` - Update a class
- `DELETE /api/classes/:id` - Delete a class

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.