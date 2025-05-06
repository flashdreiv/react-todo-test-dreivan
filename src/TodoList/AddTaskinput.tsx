import React from "react";


export function AddTaskInput({
    value,
    onChange,
    onAdd,
}: {
    value: string;
    onChange: (text: string) => void;
    onAdd: () => void;
}) {
    return (
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Add new task"
                style={{
                    flex: 1,
                    padding: "8px",
                    fontSize: "16px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                }}
            />
            <button
                onClick={onAdd}
                style={{
                    padding: "8px 16px",
                    fontSize: "16px",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    cursor: "pointer",
                }}
            >
                Add
            </button>
        </div>
    );
}