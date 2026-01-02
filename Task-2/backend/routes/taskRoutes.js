const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// CREATE - POST /tasks
router.post('/', async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ 
                success: false, 
                message: 'Title and description are required' 
            });
        }

        const newTask = new Task({ title, description });
        await newTask.save();

        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            task: newTask
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Server error', 
            error: error.message 
        });
    }
});

// READ - GET /tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            count: tasks.length,
            tasks
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Server error', 
            error: error.message 
        });
    }
});

// UPDATE - PUT /tasks/:id
router.put('/:id', async (req, res) => {
    try {
        const { title, description } = req.body;

        // Find and update task
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { 
                title, 
                description,
                updatedAt: Date.now()
            },
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({ 
                success: false, 
                message: 'Task not found' 
            });
        }

        res.json({
            success: true,
            message: 'Task updated successfully',
            task
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Server error', 
            error: error.message 
        });
    }
});

// DELETE - DELETE /tasks/:id
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({ 
                success: false, 
                message: 'Task not found' 
            });
        }

        res.json({
            success: true,
            message: 'Task deleted successfully',
            task
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Server error', 
            error: error.message 
        });
    }
});

module.exports = router;
