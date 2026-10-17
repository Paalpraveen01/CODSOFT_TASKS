
# 📇 Contact Management System API

A RESTful Contact Management API developed using Node.js, Express.js and MySQL for Task 2 of the CodSoft Backend Development Internship.

## Features

- Create, read, update and delete contacts
- Search by name, email or phone
- Sort contacts by supported fields
- Pagination with configurable page size
- Input validation and duplicate email prevention
- Appropriate HTTP status codes and error responses
- Modular routes, controllers and database configuration
- Environment variables for database credentials

## Tech Stack

- Node.js
- Express.js
- MySQL
- mysql2
- dotenv

## Setup

1. Install Node.js and MySQL.
2. Create the `contact_management_db` database and `contacts` table using the SQL in the project instructions.
3. Run `npm install`.
4. Configure `.env` with your local MySQL credentials.
5. Start the server using `node src/app.js`.

The server runs on port 5001 by default.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/contacts` | Create a contact |
| GET | `/contacts` | List contacts |
| GET | `/contacts/:id` | Get one contact |
| PUT | `/contacts/:id` | Update a contact |
| DELETE | `/contacts/:id` | Delete a contact |

## Query Parameters

- `search`: Search by name, email or phone
- `sort`: `contact_id`, `name`, `email`, `phone`, or `created_at`
- `order`: `asc` or `desc`
- `page`: Page number
- `limit`: Results per page (maximum 100)

Example:

`GET /contacts?search=arun&page=1&limit=5&sort=name&order=asc`

## Security

- Parameterized SQL queries are used for database operations.
- Sorting uses an allowlist of supported column names.
- Database credentials belong in `.env`.
- Do not commit `.env` or `node_modules/` to GitHub.

## Internship Task

CodSoft Backend Development Internship — Task 2: Contact Management System.
