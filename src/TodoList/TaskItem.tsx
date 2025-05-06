import React from "react";
import { Task } from "../types";

export function TaskItem({
    task,
    onToggle,
    onRemove,
}: {
    task: Task;
    onToggle: (id: number) => void;
    onRemove: (id: number) => void;
}) {
    return (
        <li
            style={{
                display: "flex",
                alignItems: "center",
                padding: "8px",
                borderBottom: "1px solid #eee",
            }}
        >
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                style={{ marginRight: "10px" }}
            />
            <span
                style={{
                    flex: 1,
                    textDecoration: task.completed ? "line-through" : "none",
                    fontSize: "16px",
                }}
            >
                {task.text}
            </span>
            <a
                onClick={() => onRemove(task.id)}
                style={{
                    background: "none",
                    border: "none",
                    color: "red",
                    fontSize: "20px",
                    cursor: "pointer",
                }}
                aria-label="Remove task"
            >
                ×
            </a>
        </li>
    );
}