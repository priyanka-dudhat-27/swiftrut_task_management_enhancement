const express = require('express');
const { getTasks, createTask, updateTask } = require('../controllers/taskController');
const router = express.Router();

// Task routes
router.get('/', getTasks);       // Get all tasks
router.post('/', createTask);    // Create a new task
router.put('/:id', updateTask);  // Update an existing task by ID

module.exports = router;
