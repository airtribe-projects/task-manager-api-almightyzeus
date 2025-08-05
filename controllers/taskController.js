// controllers/taskController.js


let tasks = require('../task.json').tasks;
const { query } = require('express');

const PRIORITY_LEVELS = ['low', 'medium', 'high'];


// Get all tasks
//Implement filtering by completion status for GET /tasks (e.g., GET /tasks?completed=true).
const getAllTasks = (req, res) => {
  let filteredTasks = tasks;

  // Filtering by completion status
  if (req.query.completed !== undefined) {
    const completed = req.query.completed === 'true';
    filteredTasks = filteredTasks.filter(task => task.completed === completed);
  }

  // Sorting by creation date
  if (req.query.sort === 'date') {
    filteredTasks = filteredTasks.slice().sort((a, b) => {
      // If tasks have a 'createdAt' property, use it; otherwise, sort by id
      if (a.createdAt && b.createdAt) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return a.id - b.id;
    });
  }

  res.json(filteredTasks);
};


// Get a specific task by ID
const getTaskById = (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
};


// Create a new task
const createTask = (req, res) => {
  const { title, description, completed, priority } = req.body;
  if (
    typeof title !== 'string' || title.trim() === '' ||
    typeof description !== 'string' || description.trim() === '' ||
    typeof completed !== 'boolean' ||
    (priority !== undefined && !PRIORITY_LEVELS.includes(priority))
  ) {
    return res.status(400).json({ message: 'Invalid input: title, description must be non-empty strings, completed must be boolean, and priority must be one of low, medium, high' });
  }
  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    description,
    completed,
    priority: priority || 'medium',
    createdAt: new Date().toISOString()
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
};


// Update an existing task
const updateTask = (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  const { title, description, completed, priority } = req.body;
  if (
    (title !== undefined && (typeof title !== 'string' || title.trim() === '')) ||
    (description !== undefined && (typeof description !== 'string' || description.trim() === '')) ||
    (completed !== undefined && typeof completed !== 'boolean') ||
    (priority !== undefined && !PRIORITY_LEVELS.includes(priority))
  ) {
    return res.status(400).json({ message: 'Invalid input: title/description must be non-empty strings; completed must be boolean; priority must be one of low, medium, high' });
  }
  tasks[index] = {
    ...tasks[index],
    id,
    title,
    description,
    completed,
    priority: priority !== undefined ? priority : tasks[index].priority || 'medium'
    // keep original createdAt
  };
  res.json(tasks[index]);
}

// Get tasks by priority level
const getTasksByPriority = (req, res) => {
  const level = req.params.level;
  if (!PRIORITY_LEVELS.includes(level)) {
    return res.status(400).json({ message: 'Invalid priority level. Must be one of low, medium, high.' });
  }
  const filtered = tasks.filter(task => task.priority === level);
  res.json(filtered);
};


// Delete a task
const deleteTask = (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  const deleted = tasks.splice(index, 1);
  res.json({ message: 'Task deleted', task: deleted[0] });
};


// Export all controller functions
module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTasksByPriority
};
