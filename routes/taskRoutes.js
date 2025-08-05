// routes/taskRoutes.js


const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Get all tasks
router.get('/tasks', taskController.getAllTasks);

// Get tasks by priority level
router.get('/tasks/priority/:level', taskController.getTasksByPriority);

// Get a specific task by ID
router.get('/tasks/:id', taskController.getTaskById);

// Create a new task
router.post('/tasks', taskController.createTask);

// Update an existing task
router.put('/tasks/:id', taskController.updateTask);

// Delete a task
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
