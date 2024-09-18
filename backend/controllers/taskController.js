const Task = require('../models/taskModel');

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, assignedTo, dueDate } = req.body;
  try {
    const task = new Task({ title, description, assignedTo, dueDate });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error creating task' });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, assignedTo, status, comments } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(id, { title, description, assignedTo, status, comments }, { new: true });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error updating task' });
  }
};
