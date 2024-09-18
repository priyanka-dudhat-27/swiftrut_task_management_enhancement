/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task._id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>Assigned to: {task.assignedTo}</p>
          <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
          <p>Status: {task.status}</p>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
