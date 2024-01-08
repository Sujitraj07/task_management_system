// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
const API_BASE_URL = 'http://localhost:8080'; // Replace 'YOUR_BACKEND_API_URL' with your actual backend API URL

const taskService = {
  getTasks: () => axios.get(`${API_BASE_URL}/tasks`),
  addTask: (task) => axios.post(`${API_BASE_URL}/tasks`, task),
  updateTask: (taskId, task) => axios.put(`${API_BASE_URL}/tasks/${taskId}`, task),
  deleteTask: (taskId) => axios.delete(`${API_BASE_URL}/tasks/${taskId}`),
  markComplete: (taskId) => axios.patch(`${API_BASE_URL}/tasks/${taskId}/complete`),
};

const TaskList = ({ tasks, onSelectTask, onDeleteTask, onMarkComplete }) => (
  <div className='app-content'>
    <h2>Task List</h2>
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.title}{' '}
          <button onClick={() => onSelectTask(task)}>Edit</button>
          <button onClick={() => onDeleteTask(task.id)}>Delete</button>
          <button onClick={() => onMarkComplete(task.id)}>Mark Complete</button>
        </li>
      ))}
    </ul>
  </div>
);

const AddTaskForm = ({ onAddTask }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    taskService.addTask({ title: newTaskTitle }).then(() => {
      setNewTaskTitle('');
      onAddTask();
    });
  };

  return (
    <div className="app-content">
      <h2>Add Task</h2>
      <input
        type="text"
        placeholder="Task title"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

const UpdateTaskForm = ({ task, onUpdateTask }) => {
  const [updatedTaskTitle, setUpdatedTaskTitle] = useState(task.title);

  const handleUpdateTask = () => {
    taskService.updateTask(task.id, { title: updatedTaskTitle }).then(() => {
      onUpdateTask();
    });
  };

  return (
    <div className="app-content">
      <h2>Update Task</h2>
      <input
        type="text"
        value={updatedTaskTitle}
        onChange={(e) => setUpdatedTaskTitle(e.target.value)}
      />
      <button onClick={handleUpdateTask}>Update Task</button>
    </div>
  );
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    taskService.getTasks().then((response) => setTasks(response.data));
  }, []);

  const refreshTasks = () => {
    taskService.getTasks().then((response) => setTasks(response.data));
  };

  return (
    <div className="app-container">
      <h1 className="app-header">Task Management System</h1>
      <TaskList
        tasks={tasks}
        onSelectTask={(task) => setSelectedTask(task)}
        onDeleteTask={(taskId) => taskService.deleteTask(taskId).then(refreshTasks)}
        onMarkComplete={(taskId) => taskService.markComplete(taskId).then(refreshTasks)}
      />
      <AddTaskForm onAddTask={() => refreshTasks()} />
      {selectedTask && (
        <UpdateTaskForm
          task={selectedTask}
          onUpdateTask={() => {
            refreshTasks();
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
