# Fitness Class Scheduler Frontend Documentation

## Overview
The Fitness Class Scheduler frontend is built using Angular and provides a user-friendly interface for managing gym classes. It allows users to create, read, update, and delete class information, as well as authenticate users through JWT-based authentication.

## Features
- **JWT-based Authentication**: Secure login and session management.
- **CRUD Operations**: Create, read, update, and delete gym classes.
- **Filterable Tables**: Easily filter and search through class listings.
- **Form Validation**: Ensure data integrity with client-side validation.
- **Error Handling**: Graceful handling of errors with user-friendly messages.
- **Logging**: Track application behavior and errors for debugging.

## Project Structure
- `src/app`: Contains the main application components and services.
  - `components`: Contains reusable components for class listing, forms, and login.
  - `services`: Contains services for handling API calls and authentication.
  - `guards`: Contains route guards for protecting routes.
- `assets`: Contains static assets such as images and styles.
- `angular.json`: Configuration file for Angular project settings.
- `package.json`: Lists dependencies and scripts for the frontend application.

## Getting Started
1. **Clone the Repository**: 
   ```
   git clone <repository-url>
   cd fitness-class-scheduler/frontend
   ```

2. **Install Dependencies**: 
   ```
   npm install
   ```

3. **Run the Application**: 
   ```
   ng serve
   ```

4. **Access the Application**: Open your browser and navigate to `http://localhost:4200`.

## API Integration
The frontend communicates with the backend API for managing gym classes. Ensure that the backend server is running and accessible.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.