# Task Manager API

## Overview

Task Manager API is a simple RESTful API built with Express.js for managing tasks. It supports creating, updating, deleting, filtering, sorting, and prioritizing tasks. Tasks are stored in a JSON file for easy prototyping and testing.

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd task-manager-api-almightyzeus
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start the server in development mode**
   ```bash
   npm run dev
   ```
   This command uses nodemon to automatically restart the server when you make changes to the code, making development faster and easier. Always use this in development.

## API Endpoints

### Create a Task
- **POST /tasks**
- **Body:** `{ "title": string, "description": string, "completed": boolean, "priority": "low"|"medium"|"high" }`
- **Response:** Created task object

### Get All Tasks
- **GET /tasks**
- **Query Parameters:**
  - `completed=true|false` (optional, filter by completion status)
  - `sort=date` (optional, sort by creation date)
- **Response:** Array of tasks

### Get Task by ID
- **GET /tasks/:id**
- **Response:** Task object

### Update a Task
- **PUT /tasks/:id**
- **Body:** `{ "title": string, "description": string, "completed": boolean, "priority": "low"|"medium"|"high" }`
- **Response:** Updated task object

### Delete a Task
- **DELETE /tasks/:id**
- **Response:** Deleted task object

### Get Tasks by Priority
- **GET /tasks/priority/:level**
- **Params:** `level` must be one of `low`, `medium`, `high`
- **Response:** Array of tasks with the specified priority

## Testing the API

You can use tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to test the endpoints. Example curl commands:

- **Create a task:**
  ```bash
  curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"Test","description":"Test desc","completed":false,"priority":"high"}'
  ```
- **Get all tasks:**
  ```bash
  curl http://localhost:3000/tasks
  ```
- **Get tasks by priority:**
  ```bash
  curl http://localhost:3000/tasks/priority/high
  ```
- **Update a task:**
  ```bash
  curl -X PUT http://localhost:3000/tasks/1 -H "Content-Type: application/json" -d '{"title":"Updated","description":"Updated desc","completed":true,"priority":"medium"}'
  ```
- **Delete a task:**
  ```bash
  curl -X DELETE http://localhost:3000/tasks/1
  ```

-## Running Tests

To run the test suite, use:
```bash
npm run test
```
This command runs all automated tests using Tap and Supertest. The tests cover:
- Creating tasks (valid data)
- Creating tasks (invalid data)
- Retrieving all tasks
- Retrieving a task by ID (valid and invalid ID)
- Updating a task (valid data, invalid data, invalid ID)
- Deleting a task (valid and invalid ID)

## Notes
- All data is stored in `task.json`.
- The API does not use a database; changes are in-memory and not persisted after server restart unless you add file write logic.
