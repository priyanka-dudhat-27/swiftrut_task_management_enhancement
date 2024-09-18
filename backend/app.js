const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/taskmanager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Socket.io real-time updates
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('task-update', (task) => {
    io.emit('update-tasks', task); // Send task updates to all clients
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Task routes
app.use('/api/tasks', taskRoutes);

// Start server
server.listen(5000, () => {
  console.log('Server running on port 5000');
});
