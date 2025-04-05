import React, { useState } from "react";
import "./App.css";

class Task {
  constructor(title) {
    this.title = title;
    this.isCompleted = false;
  }
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");

  const addTask = () => {
    if (taskTitle.trim() === "") {
      alert("Please enter a task.");
      return;
    }
    const newTask = new Task(taskTitle);
    setTasks([...tasks, newTask]);
    console.log("Added TODO:", newTask);
    setTaskTitle("");
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    console.log("Removed TODO");
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTasks(newTasks);
    console.log("Complete TODO:", newTasks[index]);
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a task"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.isCompleted ? "completed" : ""}>
            {task.title}
            <button onClick={() => toggleComplete(index)}>✔</button>
            <button onClick={() => removeTask(index)}>✖</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
