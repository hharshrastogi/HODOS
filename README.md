# Task 1: Authentication + Dashboard Flow

A complete MERN stack application demonstrating authentication with JWT, user registration, login, and a protected dashboard.

## Project Structure

```
Task-1/
├── backend/
│   ├── middleware/
│   │   └── auth.js           # JWT token verification middleware
│   ├── models/
│   │   └── User.js           # MongoDB User schema
│   ├── routes/
│   │   └── auth.js           # Authentication endpoints
│   ├── .env.example          # Environment variables template
│   ├── .gitignore
│   ├── package.json
│   └── server.js             # Express server setup
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── PrivateRoute.jsx      # Protected route component
    │   ├── context/
    │   │   └── AuthContext.jsx       # Auth state management
    │   ├── pages/
    │   │   ├── Dashboard.jsx         # Dashboard page
    │   │   ├── Login.jsx             # Login page
    │   │   └── Signup.jsx            # Signup page
    │   ├── styles/
    │   │   ├── Auth.css              # Auth pages styling
    │   │   └── Dashboard.css         # Dashboard styling
    │   ├── App.jsx                   # Main app with routes
    │   ├── index.css                 # Global styles
    │   └── main.jsx                  # React entry point
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── .gitignore
```

## Tech Stack

**Backend:**
- Node.js + Express.js
- MongoDB with Mongoose
- JWT (JSON Web Tokens) for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

**Frontend:**
- React 18 with Vite
- React Router for navigation
- Context API for state management
- CSS for styling

## Setup Instructions

### Backend Setup

1. Navigate to backend folder:
```bash
cd Task-1/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```
MONGO_URI=mongodb://localhost:27017/auth_dashboard
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
```

4. Start the server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd Task-1/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user (protected) |

### Request/Response Examples

**Signup:**
```json
POST /api/auth/signup
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "id": "user_id",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

**Login:**
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "id": "user_id",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

## Features

### Authentication
- User registration with validation
- Secure password hashing (bcrypt)
- JWT-based authentication
- Automatic token storage in localStorage
- Token verification on protected routes

### User Interface
- Clean, modern design with gradient backgrounds
- Responsive login and signup forms
- Form validation with error messages
- Protected dashboard page
- Logout functionality

### Dashboard
- Welcome message with username
- Display user profile information
- Logout button

## Git Commits

The project has been versioned with clear, descriptive commits:

1. **Initial Commit:** Backend setup with Express server and JWT authentication
2. **Second Commit:** Frontend setup with React routing and dashboard

View commit history:
```bash
git log --oneline
```

## Usage Flow

1. **User Registration:**
   - Navigate to `/signup`
   - Fill in username, email, and password
   - Click "Sign Up"
   - Automatically logged in and redirected to dashboard

2. **User Login:**
   - Navigate to `/login`
   - Enter email and password
   - Click "Login"
   - Redirected to dashboard

3. **Protected Dashboard:**
   - Shows welcome message with username
   - Displays user profile information
   - Logout button to return to login

## Security Features

- Passwords hashed with bcryptjs (10 salt rounds)
- JWT tokens with 24-hour expiration
- Protected routes with PrivateRoute component
- Secure token storage in localStorage
- Authorization header validation on protected endpoints

## Development Notes

- Keep both backend and frontend servers running
- Backend API proxy configured in Vite config for seamless API calls
- Error handling implemented on both frontend and backend
- Form validation on client-side to improve UX

## Future Enhancements

- Email verification
- Password reset functionality
- Refresh token rotation
- User profile update endpoint
- Account deletion feature
- Two-factor authentication

---

**Author:** MERN Stack Developer
**Date:** January 2, 2026
