import React, { useEffect, useMemo, useState } from "react";

export function ClunkyTodoList() {

  const [tasks, setTasks] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Write code", completed: true },
    { id: 3, text: "Eat lunch", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  const [multiWordOnly, setMultiWordOnly] = useState(false);


  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const tempTasks = [...tasks];
      tempTasks.push({ id: Date.now(), text: newTask, completed: false });
      setTasks(tempTasks);
      setNewTask("");
    }
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        let tempTask = { id: task.id, text: task.text, completed: task.completed };
        tempTask.completed = !tempTask.completed;
        return tempTask;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleRemoveTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleClearCompleted = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
  };

  const tasksToRender = useMemo(() => {
    let filtered = tasks;

    if (filter === "completed") {
      filtered = filtered.filter(task => task.completed);
    } else if (filter === "active") {
      filtered = filtered.filter(task => !task.completed);
    }

    if (multiWordOnly) {
      filtered = filtered.filter(task => task.text.trim().split(/\s+/).length >= 2);
    }

    return filtered;
  }, [tasks, filter, multiWordOnly]);


  const totalCount = useMemo(() => {
    return tasks.length;
  }, [tasks]);

  return (
    <div>
      <h1>To-Do List</h1>
      <h2>Items: {totalCount}</h2>
      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        placeholder="Add new task"
      />
      <button onClick={handleAddTask}>Add</button>

      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setMultiWordOnly(prev => !prev)}>
          {multiWordOnly ? "All lengths" : "Multiword"}
        </button>
        <button onClick={handleClearCompleted}>Clear all completed tasks</button>
      </div>
      <ul>
        {tasksToRender.map((task, index) => (
          <li key={index} style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>

            <a
              onClick={() => handleRemoveTask(task.id)}
              style={{
                cursor: "pointer",
                fontSize: "20px",
                color: "red",
                marginLeft: "10px",
                textDecoration: "none",
              }}
            >
              ×
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
