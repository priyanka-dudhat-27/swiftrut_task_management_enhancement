/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

// Establish connection to the backend
const socket = io('http://localhost:5000');

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch initial tasks
    fetch('http://localhost:5000/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data));

    // Listen for real-time task updates
    socket.on('update-tasks', (newTask) => {
      setTasks(prevTasks => [...prevTasks, newTask]);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="App">
      <h1>Task Management</h1>
      <TaskForm />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
