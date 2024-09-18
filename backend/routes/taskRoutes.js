const express = require('express');
const { getTasks, createTask, updateTask } = require('../controllers/taskController');
const router = express.Router();

// Task routes
router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);

module.exports = router;
