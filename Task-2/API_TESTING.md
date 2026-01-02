# Task 2 - API Testing Guide

## Quick Test with cURL

### 1. Create a Task
```bash
curl -X POST http://localhost:5001/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn MongoDB","description":"Complete MongoDB tutorial and practice CRUD operations"}'
```

### 2. Get All Tasks
```bash
curl http://localhost:5001/tasks
```

### 3. Update a Task
```bash
# Replace {TASK_ID} with actual task ID from step 2
curl -X PUT http://localhost:5001/tasks/{TASK_ID} \
  -H "Content-Type: application/json" \
  -d '{"title":"Master MongoDB","description":"Complete advanced MongoDB features"}'
```

### 4. Delete a Task
```bash
# Replace {TASK_ID} with actual task ID
curl -X DELETE http://localhost:5001/tasks/{TASK_ID}
```

## Test with Postman/Thunder Client

### POST /tasks
- URL: `http://localhost:5001/tasks`
- Method: POST
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "title": "Build React App",
  "description": "Create a task management frontend using React"
}
```

### GET /tasks
- URL: `http://localhost:5001/tasks`
- Method: GET

### PUT /tasks/:id
- URL: `http://localhost:5001/tasks/{TASK_ID}`
- Method: PUT
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "title": "Build Full Stack App",
  "description": "Create both frontend and backend"
}
```

### DELETE /tasks/:id
- URL: `http://localhost:5001/tasks/{TASK_ID}`
- Method: DELETE

## Sample Data for Testing

```json
[
  {
    "title": "Setup Development Environment",
    "description": "Install Node.js, MongoDB, and VS Code"
  },
  {
    "title": "Learn Express.js",
    "description": "Complete Express.js fundamentals course"
  },
  {
    "title": "Database Design",
    "description": "Design schema for task management system"
  }
]
```

## Expected Responses

### Success Response (Create)
```json
{
  "success": true,
  "message": "Task created successfully",
  "task": {
    "_id": "67790abc123def456",
    "title": "Learn MongoDB",
    "description": "Complete MongoDB tutorial",
    "createdAt": "2026-01-02T10:30:00.000Z",
    "updatedAt": "2026-01-02T10:30:00.000Z"
  }
}
```

### Success Response (Get All)
```json
{
  "success": true,
  "count": 3,
  "tasks": [...]
}
```

### Error Response
```json
{
  "success": false,
  "message": "Title and description are required"
}
```
