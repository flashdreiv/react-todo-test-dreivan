import React, { useState, useMemo, useEffect } from "react";
import { Task } from "../types";
import { TaskItem } from "./TaskItem";
import { TaskFilters } from "./TaskFilters";
import { AddTaskInput } from "./AddTaskinput";

export function TodoList() {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, text: "Learn React", completed: false },
        { id: 2, text: "Write code", completed: true },
        { id: 3, text: "Eat lunch", completed: false },
    ]);
    const [newTask, setNewTask] = useState("");
    const [filter, setFilter] = useState("all");
    const [multiWordOnly, setMultiWordOnly] = useState(false);

    const addTask = () => {
        const trimmed = newTask.trim();
        if (!trimmed) return;
        setTasks((prev) => [
            ...prev,
            { id: Date.now(), text: trimmed, completed: false },
        ]);
        setNewTask("");
    };

    const toggleComplete = (id: number) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const removeTask = (id: number) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const clearCompleted = () => {
        setTasks((prev) => prev.filter((task) => !task.completed));
    };

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            // Check if the task text contains two or more words
            const isMultiWord = task.text.trim().split(/\s+/).length >= 2;

            const matchesFilter =
                filter === "all" ||
                (filter === "active" && !task.completed) ||
                (filter === "completed" && task.completed);

            return matchesFilter && (filter === "all" || !multiWordOnly || isMultiWord);
        });
    }, [tasks, filter, multiWordOnly]);

    return (
        <div
            style={{
                maxWidth: "600px",
                margin: "40px auto",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <h1 style={{ marginBottom: "0.5rem" }}>📝 To-Do List</h1>
            <p style={{ marginTop: 0, color: "#666" }}>Items: {tasks.length}</p>

            <AddTaskInput value={newTask} onChange={setNewTask} onAdd={addTask} />

            <TaskFilters
                filter={filter}
                setFilter={(f) => {
                    // Reset multiWordOnly when filter is set to "all"
                    // This ensures that the multiWordOnly filter is only applied when the user selects a specific filter
                    if (f === "all") setMultiWordOnly(false);
                    setFilter(f);
                }}
                multiWordOnly={multiWordOnly}
                toggleMultiWord={() => setMultiWordOnly((prev) => !prev)}
                clearCompleted={clearCompleted}
            />

            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {filteredTasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={toggleComplete}
                        onRemove={removeTask}
                    />
                ))}
                {filteredTasks.length === 0 && (
                    <li style={{ textAlign: "center", color: "#999", padding: "16px" }}>
                        No tasks to show.
                    </li>
                )}
            </ul>
        </div>
    );
}