const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  assignedTo: {
    type: String,  // Can also be an ObjectId if referencing users
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    default: 'pending'  // Or other statuses like 'completed', 'in-progress'
  },
  comments: {
    type: [String],  // Array of strings to hold comments
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
