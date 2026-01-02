require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((error) => console.error('❌ MongoDB connection error:', error.message));

// Routes
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Task CRUD API - Task 2', endpoints: [
        'POST /tasks - Create a task',
        'GET /tasks - Get all tasks',
        'PUT /tasks/:id - Update a task',
        'DELETE /tasks/:id - Delete a task'
    ]});
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
