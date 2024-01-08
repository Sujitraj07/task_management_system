Task Management System
Prerequisites
Before you begin, ensure you have the following installed:

Node.js and npm - Download and Install Node.js
Java 8 or later - Download and Install Java
MySQL Database - Download and Install MySQL
Getting Started
Clone the Repository:

bash
Copy code
git clone https://github.com/your-username/task-management-system.git
cd task-management-system
Set up the Backend:

Open backend/src/main/resources/application.properties and configure your MySQL database:
The backend server will start on http://localhost:8080.

Set up the Frontend:

Open frontend/src/App.js and update the API_BASE_URL with your backend URL:
javascript
Copy code
const API_BASE_URL = 'http://localhost:8080'; // Update with your backend URL
Install Dependencies and Run:
bash
Copy code
cd frontend
npm install
npm start
The React app will start on http://localhost:3000.

Usage:

Access the Task Management System at http://localhost:3000 in your web browser.
Use the provided UI to add, update, and delete tasks.
Contributing:

In the video provided, the steps to run the application is shown.

