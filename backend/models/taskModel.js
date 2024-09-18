const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  assignedTo: { type: String },
  status: { type: String, default: 'pending' },
  dueDate: { type: Date },
  comments: [{ user: String, text: String, date: { type: Date, default: Date.now } }],
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
