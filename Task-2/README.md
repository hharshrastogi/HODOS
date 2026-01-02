# Task 2: CRUD API - Tasks Module

A simple RESTful API for task management with full CRUD operations.

## Project Structure

```
Task-2/
└── backend/
    ├── models/
    │   └── Task.js           # Task schema with validation
    ├── routes/
    │   └── taskRoutes.js     # CRUD endpoints
    ├── .env.example          # Environment variables template
    ├── .gitignore
    ├── package.json
    └── server.js             # Express server
```

## Tech Stack

- **Backend:** Node.js + Express.js
- **Database:** MongoDB with Mongoose
- **Features:** Full CRUD operations, validation, error handling

## Setup Instructions

1. Navigate to backend folder:
```bash
cd Task-2/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
MONGO_URI=mongodb://localhost:27017/HODOS_TASK_2
PORT=5001
```

4. Start the server:
```bash
npm run dev
```

Server runs on `http://localhost:5001`

## API Endpoints

### 1. Create Task
**POST** `/tasks`

Request Body:
```json
{
  "title": "Complete project",
  "description": "Finish the CRUD API implementation"
}
```

Response:
```json
{
  "success": true,
  "message": "Task created successfully",
  "task": {
    "_id": "...",
    "title": "Complete project",
    "description": "Finish the CRUD API implementation",
    "createdAt": "2026-01-02T...",
    "updatedAt": "2026-01-02T..."
  }
}
```

### 2. Get All Tasks
**GET** `/tasks`

Response:
```json
{
  "success": true,
  "count": 2,
  "tasks": [
    {
      "_id": "...",
      "title": "Complete project",
      "description": "Finish the CRUD API implementation",
      "createdAt": "2026-01-02T...",
      "updatedAt": "2026-01-02T..."
    }
  ]
}
```

### 3. Update Task
**PUT** `/tasks/:id`

Request Body:
```json
{
  "title": "Updated title",
  "description": "Updated description"
}
```

Response:
```json
{
  "success": true,
  "message": "Task updated successfully",
  "task": {
    "_id": "...",
    "title": "Updated title",
    "description": "Updated description",
    "createdAt": "2026-01-02T...",
    "updatedAt": "2026-01-02T..."
  }
}
```

### 4. Delete Task
**DELETE** `/tasks/:id`

Response:
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "task": {
    "_id": "...",
    "title": "Complete project",
    "description": "Finish the CRUD API implementation"
  }
}
```

## Testing with cURL

```bash
# Create a task
curl -X POST http://localhost:5001/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"My Task","description":"Task description"}'

# Get all tasks
curl http://localhost:5001/tasks

# Update a task (replace {id} with actual task ID)
curl -X PUT http://localhost:5001/tasks/{id} \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Task","description":"Updated description"}'

# Delete a task (replace {id} with actual task ID)
curl -X DELETE http://localhost:5001/tasks/{id}
```

## Database Collection

- **Database:** HODOS_TASK_2
- **Collection:** TASK2_CRUD
- **Schema:** Title (String, required), Description (String, required), Timestamps

## Features

✅ Full CRUD operations (Create, Read, Update, Delete)
✅ MongoDB integration with Mongoose
✅ Input validation
✅ Error handling
✅ RESTful API design
✅ Timestamps (createdAt, updatedAt)
✅ Clean code structure

---

**Task 2 Status:** Complete ✅
