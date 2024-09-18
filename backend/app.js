const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes'); // Import task routes

const app = express();
const server = http.createServer(app);

// Initialize Socket.io
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000', // Adjust to your frontend's address
    methods: ['GET', 'POST', 'PUT' , 'DELETE'],
  },
});

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/taskmanager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Socket.io Real-Time Updates
io.on('connection', (socket) => {
  console.log('New client connected');

  // Listen for task updates from clients
  socket.on('task-update', (task) => {
    io.emit('update-tasks', task); // Broadcast to all clients
  });

  socket.on('add-task', (task) => {
    io.emit('update-tasks', task); // Emit new task to all clients
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Use task routes for CRUD operations
app.use('/api/tasks', taskRoutes);

// Start server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
