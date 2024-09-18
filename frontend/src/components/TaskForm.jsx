/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = { title, description, assignedTo, dueDate };

    // Send task to server
    fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })
      .then(response => response.json())
      .then(newTask => {
        // Emit task-update event via Socket.io
        window.socket.emit('task-update', newTask);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" required />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="text" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} placeholder="Assign To" />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <button type="submit">Create Task</button>
    </form>
  );
}

export default TaskForm;
