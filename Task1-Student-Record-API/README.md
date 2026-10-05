🎓 Student Record Management API
A RESTful backend API for managing students, courses, and enrollments using Node.js, Express.js, and MySQL.
This project is developed as Task 1 of the CodSoft Backend Development Internship.

📌 Project Overview
The Student Record Management API is a backend application designed to manage student records, course information, and student-course enrollments through RESTful APIs.
The application provides APIs for:
- 👨‍🎓 Student management
- 📚 Course management
- 📝 Enrollment management
- 🔍 Search
- 🎯 Filtering
- ↕️ Sorting
- 📄 Pagination
- ✅ Request validation
- ⚠️ Error handling
- 🗄️ MySQL relational database
- 🔗 RESTful API architecture

The project follows a modular backend architecture using:
- Routes
- Controllers
- Database configuration
- Environment variables

🎯 Objectives
The main objectives of this project are:
1. Build a RESTful backend API.
2. Manage student records.
3. Manage course information.
4. Manage student-course enrollments.
5. Store application data using a relational database.
6. Implement CRUD operations.
7. Validate incoming request data.
8. Handle errors and duplicate records.
9. Implement search and filtering.
10. Implement sorting and pagination.
11. Maintain a clean and modular backend structure.

🛠️ Technology Stack
Technology	Purpose
🟢 Node.js	JavaScript runtime
🚀 Express.js	Backend web framework
🐬 MySQL	Relational database
📦 mysql2	MySQL database connectivity
🔐 dotenv	Environment variable management
🧪 Postman	API testing
💻 Visual Studio Code	Development environment
🔧 Git	Version control
🐙 GitHub	Source code hosting
🌐 REST API	Backend API architecture


🏗️ System Architecture
The project follows a modular backend architecture.
                    Client / Postman
                           │
                           ▼
                  ┌─────────────────┐
                  │   Express.js    │
                  │     Server      │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │      Routes     │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │   Controllers   │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │ MySQL Database  │
                  └─────────────────┘
Request Flow
Client
  │
  ▼
HTTP Request
  │
  ▼
Express Route
  │
  ▼
Controller
  │
  ▼
MySQL Query
  │
  ▼
Database
  │
  ▼
Controller
  │
  ▼
JSON Response
  │
  ▼
Client
📁 Project Structure
Task1-Student-Record-API/
│
├── node_modules/
│
├── src/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── studentController.js
│   │   ├── courseController.js
│   │   └── enrollmentController.js
│   │
│   ├── routes/
│   │   ├── studentRoutes.js
│   │   ├── courseRoutes.js
│   │   └── enrollmentRoutes.js
│   │
│   └── app.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

🗄️ Database
The application uses MySQL as its relational database.
Database Name
student_record_db
The database contains three main tables:
┌────────────────────┐
│      STUDENTS      │
├────────────────────┤
│ student_id (PK)    │
│ name               │
│ email              │
│ phone              │
│ date_of_birth      │
│ created_at         │
└─────────┬──────────┘
          │
          │
          │
┌─────────▼──────────┐
│    ENROLLMENTS     │
├────────────────────┤
│ enrollment_id (PK) │
│ student_id (FK)    │
│ course_id (FK)     │
│ enrollment_date    │
└─────────┬──────────┘
          │
          │
          │
┌─────────▼──────────┐
│      COURSES       │
├────────────────────┤
│ course_id (PK)     │
│ course_name        │
│ course_code        │
│ description        │
│ created_at         │
└────────────────────┘
👨‍🎓 Students Table
The students table stores student information.
CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(15),
    date_of_birth DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Fields
Field	Description
student_id	Unique student identifier
name	Student name
email	Student email address
phone	Student phone number
date_of_birth	Student date of birth
created_at	Record creation timestamp


📚 Courses Table
The courses table stores course information.
CREATE TABLE courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    course_code VARCHAR(20) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Fields
Field	Description
course_id	Unique course identifier
course_name	Course name
course_code	Unique course code
description	Course description
created_at	Record creation timestamp


📝 Enrollments Table
The enrollments table connects students with courses.
CREATE TABLE enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    enrollment_date DATE NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id),
    UNIQUE (student_id, course_id)
);
Fields
Field	Description
enrollment_id	Unique enrollment identifier
student_id	Reference to a student
course_id	Reference to a course
enrollment_date	Date of enrollment


The following constraint prevents duplicate enrollment of the same student in the same course:
UNIQUE (student_id, course_id)
🔗 Database Relationships
Students
   │
   │ 1
   │
   │
   │ Many
   ▼
Enrollments
   ▲
   │ Many
   │
   │ 1
   │
Courses
Relationship Explanation
- One student can have multiple enrollments.
- One course can have multiple enrollments.
- The enrollments table connects students and courses.
- Foreign keys maintain the relationship between the tables.
- The unique constraint prevents duplicate student-course enrollment.
👨‍🎓 Student API
Base URL:
http://localhost:5000/students
➕ Create Student
Endpoint
POST /students
Request Body
{
    "name": "Test Student",
    "email": "teststudent@gmail.com",
    "phone": "9876543210",
    "date_of_birth": "2005-10-09"
}
Response
{
    "message": "Student created successfully",
    "student_id": 2
}
Status Code
201 Created
📋 Get All Students
Endpoint
GET /students
Example Response
{
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1,
    "data": [
        {
            "student_id": 2,
            "name": "Test Student",
            "email": "teststudent@gmail.com",
            "phone": "9876543210",
            "date_of_birth": "2005-10-09",
            "created_at": "2026-10-01T00:00:00.000Z"
        }
    ]
}

🔍 Get Student by ID
Endpoint
GET /students/:id
Example
GET /students/2
Response
{
    "student_id": 2,
    "name": "Test Student",
    "email": "teststudent@gmail.com",
    "phone": "9876543210",
    "date_of_birth": "2005-10-09"
}
Student Not Found
{
    "message": "Student not found"
}
Status:
404 Not Found
✏️ Update Student
Endpoint
PUT /students/:id
Example
PUT /students/2
Request Body
{
    "name": "Updated Student",
    "email": "teststudent@gmail.com",
    "phone": "9999999999",
    "date_of_birth": "2005-10-09"
}
Response
{
    "message": "Student updated successfully"
}
🗑️ Delete Student
Endpoint
DELETE /students/:id
Example
DELETE /students/2
Response
{
    "message": "Student deleted successfully"
}

🔎 Search Students
Students can be searched using:
- Name
- Email
- Phone
Endpoint
GET /students?search=Test
The search uses:
WHERE name LIKE ?
OR email LIKE ?
OR phone LIKE ?
↕️ Student Sorting
Students can be sorted using the sort and order parameters.
Ascending
GET /students?sort=name&order=asc
Descending
GET /students?sort=name&order=desc
Available Sort Fields
student_id
name
email
phone
date_of_birth
created_at
📄 Student Pagination
Pagination uses:
page
limit
Example
GET /students?page=1&limit=5
Example Response
{
    "page": 1,
    "limit": 5,
    "total": 12,
    "totalPages": 3,
    "data": []
}
Pagination Calculation
offset = (page - 1) × limit
For example:
Page 1
Limit 5
Offset = (1 - 1) × 5
       = 0
Page 2
Limit 5
Offset = (2 - 1) × 5
       = 5
📚 Course API
Base URL:
http://localhost:5000/courses

➕ Create Course
Endpoint
POST /courses
Request Body
{
    "course_name": "Advanced Java Programming",
    "course_code": "JAVA201",
    "description": "Advanced Java programming course"
}
Response
{
    "message": "Course created successfully",
    "course_id": 1
}

📋 Get All Courses
Endpoint
GET /courses
🔍 Get Course by ID
Endpoint
GET /courses/:id
Example
GET /courses/1
✏️ Update Course
Endpoint
PUT /courses/:id
Example
PUT /courses/1
Request Body
{
    "course_name": "Advanced Java Programming",
    "course_code": "JAVA201",
    "description": "Advanced Java programming course"
}
Response
{
    "message": "Course updated successfully"
}
Note: The current implementation provides Create, Read, and Update operations for courses. A course DELETE endpoint has not been implemented.

🔎 Search Courses
Courses can be searched using:
- Course name
- Course code
- Description
Example
GET /courses?search=Java
The search uses:
WHERE course_name LIKE ?
OR course_code LIKE ?
OR description LIKE ?
↕️ Course Sorting
Example
GET /courses?sort=course_name&order=asc
Available Sort Fields
course_id
course_name
course_code
created_at
📄 Course Pagination
Example
GET /courses?page=1&limit=5
The response contains:
page
limit
total
totalPages
data

📝 Enrollment API
Base URL:
http://localhost:5000/enrollments
➕ Create Enrollment
Endpoint
POST /enrollments
Request Body
{
    "student_id": 2,
    "course_id": 1,
    "enrollment_date": "2026-10-01"
}
Response
{
    "message": "Enrollment created successfully",
    "enrollment_id": 3
}

📋 Get All Enrollments
Endpoint
GET /enrollments
🔍 Get Enrollment by ID
Endpoint
GET /enrollments/:id
Example
GET /enrollments/3
✏️ Update Enrollment
Endpoint
PUT /enrollments/:id
Example
PUT /enrollments/3
Request Body
{
    "student_id": 2,
    "course_id": 1,
    "enrollment_date": "2026-10-05"
}
Response
{
    "message": "Enrollment updated successfully"
}
🗑️ Delete Enrollment
Endpoint
DELETE /enrollments/:id
Example
DELETE /enrollments/3
Response
{
    "message": "Enrollment deleted successfully"
}
🎯 Enrollment Filtering
Enrollments can be filtered using:
By Student
GET /enrollments?student_id=2
By Course
GET /enrollments?course_id=1
By Both
GET /enrollments?student_id=2&course_id=1

↕️ Enrollment Sorting
Example
GET /enrollments?sort=enrollment_date&order=desc
Available Sort Fields
enrollment_id
student_id
course_id
enrollment_date

📄 Enrollment Pagination
Example
GET /enrollments?page=1&limit=5
🔎 Search, Filtering, Sorting & Pagination
The API supports combining multiple query parameters.
Example Student Request
GET /students?search=Test&page=1&limit=5&sort=name&order=asc
This performs:
Search
   ↓
Sort
   ↓
Pagination
   ↓
JSON Response
Example Course Request
GET /courses?search=Java&page=1&limit=5&sort=course_name&order=asc
Example Enrollment Request
GET /enrollments?student_id=2&page=1&limit=5&sort=enrollment_date&order=desc
✅ Request Validation
The API validates incoming request data before performing database operations.

👨‍🎓 Student Validation
Required Fields
name
email
Missing Required Fields
{
    "message": "Name and email are required"
}
Status:
400 Bad Request
Invalid Email
{
    "message": "Invalid email format"
}
Invalid Phone
{
    "message": "Phone number must contain 10 to 15 digits"
}
Invalid Date
{
    "message": "Invalid date of birth"
}
📚 Course Validation
Required Fields
course_name
course_code
Missing Required Fields
{
    "message": "Course name and course code are required"
}
Invalid Course Code
Course code must contain between 3 and 20 characters.
{
    "message": "Course code must be between 3 and 20 characters"
}
📝 Enrollment Validation
Required Fields
student_id
course_id
enrollment_date
Missing Fields
{
    "message": "Student ID, course ID and enrollment date are required"
}
Invalid IDs
{
    "message": "Student ID and course ID must be valid numbers"
}
Invalid Date
{
    "message": "Invalid enrollment date"
}
Student Does Not Exist
{
    "message": "Student not found"
}
Course Does Not Exist
{
    "message": "Course not found"
}
⚠️ Duplicate Data Handling
The API handles duplicate records using database constraints and error handling.
Duplicate Student Email
{
    "message": "Email already exists"
}
Status:
409 Conflict
Duplicate Course Code
{
    "message": "Course code already exists"
}
Status:
409 Conflict
Duplicate Enrollment
If the same student is already enrolled in the same course:
{
    "message": "Student is already enrolled in this course"
}
Status:
409 Conflict
⚠️ Error Handling
The application handles:
- Invalid input
- Missing required fields
- Invalid email
- Invalid phone number
- Invalid dates
- Non-existent students
- Non-existent courses
- Duplicate records
- Database errors
- Non-existent resources
Example internal server error:
{
    "message": "Failed to fetch students"
}
🌐 HTTP Status Codes
Status Code	Meaning
200 OK	Request completed successfully
201 Created	Resource successfully created
400 Bad Request	Invalid request data
404 Not Found	Resource does not exist
409 Conflict	Duplicate or conflicting data
500 Internal Server Error	Server/database error


🔐 Parameterized SQL Queries
The application uses parameterized SQL queries.
Example:
await pool.execute(
    "SELECT * FROM students WHERE student_id = ?",
    [id]
);
Parameterized queries separate SQL statements from user-provided values and help reduce SQL injection risks.
⚙️ Environment Configuration
The application uses a .env file for database configuration.
Create a .env file in the project root:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=student_record_db
DB_PORT=3306
PORT=5000

📦 Installation
1. Clone Repository
git clone https://github.com/Paalpraveen01/CODSOFT_TASKS.git
2. Navigate to Project
cd CODSOFT_TASKS
cd Task1-Student-Record-API
3. Install Dependencies
npm install
🐬 MySQL Setup
Make sure MySQL Server is installed and running.
Create the database:
CREATE DATABASE student_record_db;
Select the database:
USE student_record_db;
Create the three required tables using the SQL commands provided in this README.
▶️ Run the Application
Start the server using:
node src/app.js
Expected output:
Server running on port 5000
MySQL database connected successfully
🌐 API Base URL
http://localhost:5000
❤️ Health Check
Endpoint
GET /
Response
{
    "message": "Student Record Management API is running"
}
🧪 API Testing
The API was tested using Postman.
Student APIs Tested
- ✅ Create student
- ✅ Get all students
- ✅ Get student by ID
- ✅ Update student
- ✅ Delete student
- ✅ Search students
- ✅ Sort students
- ✅ Paginate students
- ✅ Validate student input
- ✅ Handle duplicate email
Course APIs Tested
- ✅ Create course
- ✅ Get all courses
- ✅ Get course by ID
- ✅ Update course
- ✅ Search courses
- ✅ Sort courses
- ✅ Paginate courses
- ✅ Validate course input
- ✅ Handle duplicate course code
Enrollment APIs Tested
- ✅ Create enrollment
- ✅ Get all enrollments
- ✅ Get enrollment by ID
- ✅ Update enrollment
- ✅ Delete enrollment
- ✅ Filter by student
- ✅ Filter by course
- ✅ Sort enrollments
- ✅ Paginate enrollments
- ✅ Validate enrollment input
- ✅ Validate student existence
- ✅ Validate course existence
- ✅ Handle duplicate enrollment
🧪 Example Testing Flow
A typical API testing flow:
1. Start MySQL
       ↓
2. Start Node.js Server
       ↓
3. Create Student
       ↓
4. Create Course
       ↓
5. Create Enrollment
       ↓
6. Get Student
       ↓
7. Get Course
       ↓
8. Get Enrollment
       ↓
9. Update Records
       ↓
10. Search / Filter
       ↓
11. Sort / Paginate
       ↓
12. Delete Enrollment
🏗️ Code Organization
src/app.js
Responsible for:
- Creating Express application
- Configuring middleware
- Registering routes
- Starting the server
- Testing database connectivity
src/config/db.js
Responsible for:
- Creating MySQL connection pool
- Reading database configuration
- Providing database connection to controllers
src/controllers/
Contains application logic.
studentController.js
Handles:
- Student creation
- Student retrieval
- Student update
- Student deletion
- Student search
- Student sorting
- Student pagination
- Student validation
courseController.js
Handles:
- Course creation
- Course retrieval
- Course update
- Course search
- Course sorting
- Course pagination
- Course validation
enrollmentController.js
Handles:
- Enrollment creation
- Enrollment retrieval
- Enrollment update
- Enrollment deletion
- Enrollment filtering
- Enrollment sorting
- Enrollment pagination
- Enrollment validation
src/routes/
Contains API route definitions.
studentRoutes.js
courseRoutes.js
enrollmentRoutes.js
Routes connect HTTP requests to their respective controllers.
📊 API Endpoint Summary
👨‍🎓 Students
Method	Endpoint	Description
POST	/students	Create student
GET	/students	Get all students
GET	/students/:id	Get student by ID
PUT	/students/:id	Update student
DELETE	/students/:id	Delete student


📚 Courses
Method	Endpoint	Description
POST	/courses	Create course
GET	/courses	Get all courses
GET	/courses/:id	Get course by ID
PUT	/courses/:id	Update course


📝 Enrollments
Method	Endpoint	Description
POST	/enrollments	Create enrollment
GET	/enrollments	Get all enrollments
GET	/enrollments/:id	Get enrollment by ID
PUT	/enrollments/:id	Update enrollment
DELETE	/enrollments/:id	Delete enrollment


🔍 Query Parameters
Students
search
sort
order
page
limit
Example:
GET /students?search=Test&sort=name&order=asc&page=1&limit=5
Courses
search
sort
order
page
limit
Example:
GET /courses?search=Java&sort=course_name&order=asc&page=1&limit=5
Enrollments
student_id
course_id
sort
order
page
limit
Example:
GET /enrollments?student_id=2&sort=enrollment_date&order=desc&page=1&limit=5
📈 Development Progress
Day 1 — Project Initialization
Completed:
- Node.js project initialization
- Express.js installation
- Basic Express server
- JSON middleware
- Root API endpoint
- .gitignore
- Git repository setup
- GitHub repository setup
Commit:
chore: initialize student record management API

Day 2 — Relational Database Setup
Completed:
- MySQL database setup
- Students table
- Courses table
- Enrollments table
- Primary keys
- Foreign keys
- Unique constraints
- MySQL connection
- Environment variables
Commit:
feat: add relational database models

Day 3 — Student API
Completed:
- Create student
- Get all students
- Get student by ID
- Update student
- Delete student
- Student database integration
Commit:
feat: implement student CRUD APIs

Day 4 — Course API
Completed:
- Create course
- Get all courses
- Get course by ID
- Update course
- Course database integration
Commit:
feat: implement course CRUD APIs
Note: A course DELETE endpoint is not included in the current implementation.

Day 5 — Enrollment API
Completed:
- Create enrollment
- Get all enrollments
- Get enrollment by ID
- Update enrollment
- Delete enrollment
- Student-course relationship
Commit:
feat: implement enrollment CRUD APIs

Day 6 — Validation & Error Handling
Completed:
- Required-field validation
- Email validation
- Phone validation
- Date validation
- Course-code validation
- Student existence validation
- Course existence validation
- Duplicate email handling
- Duplicate course-code handling
- Duplicate enrollment handling
- HTTP status codes
Commit:
feat: add request validation and error handling

Day 7 — Search & Filtering
Completed:
- Student search
- Course search
- Enrollment filtering
- Search by student name
- Search by email
- Search by phone
- Search by course name
- Search by course code
- Search by description
- Filter by student ID
- Filter by course ID
Commit:
feat: add search and filtering

Day 8 — Sorting & Pagination
Completed:
- Sorting
- Ascending order
- Descending order
- Pagination
- Page number
- Result limit
- Total records
- Total pages
- Search + sorting + pagination combination
Commit:
feat: add sorting and pagination

Day 9 — API Testing & Documentation
Completed:
- Student API testing
- Course API testing
- Enrollment API testing
- Search testing
- Filtering testing
- Sorting testing
- Pagination testing
- Validation testing
- Error handling testing
- README documentation
Commit:
docs: add project documentation

📊 Current Sample Data
The application was tested with sample records.
Student
Student ID : 2
Name       : Test Student
Email      : teststudent@gmail.com
Phone      : 9876543210
DOB        : 2005-10-09
Course
Course ID   : 1
Course Name : Advanced Java Programming
Course Code : JAVA201
Description : Advanced Java programming course
Enrollment
Enrollment ID : 3
Student ID    : 2
Course ID     : 1
Date          : 2026-10-01

🎓 Learning Outcomes
This project provided practical understanding of:
- REST API development
- Node.js
- Express.js
- MySQL
- Relational database design
- Primary keys
- Foreign keys
- Unique constraints
- CRUD operations
- SQL queries
- Parameterized queries
- Request validation
- Error handling
- HTTP status codes
- Search functionality
- Filtering
- Sorting
- Pagination
- Environment variables
- Modular backend architecture
- API testing
- Git
- GitHub

🚀 Future Improvements
Possible future enhancements include:
- 🔐 Authentication and authorization
- 👤 Role-based access
- 📚 Course DELETE endpoint
- 📖 Swagger/OpenAPI documentation
- 🧪 Automated API testing
- 🛡️ Advanced validation
- 📊 Student and course reports
- 📈 Dashboard
- ☁️ Cloud deployment
- 🐳 Docker support
💼 CodSoft Internship

This project is developed as part of the:
CodSoft Backend Development Internship
Organization : CodSoft
Program      : Backend Development
Duration     : 25 September 2026 – 25 October 2026
Task         : Task 1 – Student Record Management API
📌 Task 1 Implementation
The project implements the major backend requirements for the Student Record Management API:
- RESTful backend
- Student management
- Course management
- Enrollment management
- Relational database models
- CRUD operations
- Request validation
- Error handling
- Appropriate HTTP status codes
- Search
- Filtering
- Sorting
- Pagination
- Modular project structure
🐙 GitHub Repository
Main CodSoft repository:
https://github.com/Paalpraveen01/CODSOFT_TASKS
Task 1 project:
CODSOFT_TASKS/Task1-Student-Record-API
👨‍💻 Author
Mohamed Aadhil M.
Backend Development Internship Project
GitHub:
https://github.com/Paalpraveen01
⭐ Project Status
🟢 Task 1 – Student Record Management API

Project Setup          : Completed
Express.js Server      : Completed
MySQL Integration      : Completed
Database Design        : Completed
Student APIs           : Completed
Course APIs            : Completed
Enrollment APIs        : Completed
Validation             : Completed
Error Handling         : Completed
Search                 : Completed
Filtering              : Completed
Sorting                : Completed
Pagination             : Completed
API Testing            : Completed
Documentation          : Completed

⭐ Conclusion
The Student Record Management API demonstrates a modular backend implementation using Node.js, Express.js, and MySQL.
The project provides structured REST APIs for managing students, courses, and enrollments while supporting validation, error handling, search, filtering, sorting, and pagination.
The project was developed as part of the CodSoft Backend Development Internship to gain practical experience in backend API development and relational database integration.