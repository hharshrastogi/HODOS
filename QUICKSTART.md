# Quick Start Guide

Get the MERN Auth Dashboard app running in 5 minutes!

## Prerequisites
- Node.js (v16 or higher)
- MongoDB running locally or MongoDB Atlas URI

## Installation

### Step 1: Set up Backend

```bash
cd Task-1/backend
npm install
```

Create `.env` file:
```
MONGO_URI=mongodb://localhost:27017/auth_dashboard
JWT_SECRET=your_secret_key_here
PORT=5000
```

Start backend:
```bash
npm run dev
```

### Step 2: Set up Frontend

In a new terminal:

```bash
cd Task-1/frontend
npm install
npm run dev
```

## Access the App

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## Test Account

After starting the app:

1. Go to http://localhost:3000/signup
2. Create a new account or use:
   - Email: `test@example.com`
   - Password: `test123`
3. You'll be redirected to the dashboard

## Common Issues

**Issue: Cannot connect to MongoDB**
- Ensure MongoDB is running
- Check MONGO_URI in `.env` file
- If using MongoDB Atlas, make sure IP is whitelisted

**Issue: Port 5000 already in use**
- Change PORT in `.env` to a different port
- Update VITE proxy in `frontend/vite.config.js`

**Issue: CORS errors**
- Ensure backend is running on port 5000
- Verify CORS is enabled in `server.js`

## File Structure at a Glance

```
Backend handles:
- User registration & login
- Password hashing with bcrypt
- JWT token generation
- Protected routes verification

Frontend handles:
- User interface for signup/login
- Form validation
- Token storage & management
- Route protection
- Dashboard display
```

## Next Steps

- Explore the code in both folders
- Check git commits to see the development process
- Modify styles in `styles/` folders
- Add more features as needed

---

For detailed information, see `README.md`
