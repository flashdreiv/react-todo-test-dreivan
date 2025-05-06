import React from "react";

export function TaskFilters({
    filter,
    setFilter,
    multiWordOnly,
    toggleMultiWord,
    clearCompleted,
}: {
    filter: string;
    setFilter: (val: string) => void;
    multiWordOnly: boolean;
    toggleMultiWord: () => void;
    clearCompleted: () => void;
}) {
    const buttonStyle = (active: boolean) => ({
        padding: "6px 12px",
        fontSize: "14px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        backgroundColor: active ? "#1976D2" : "#f9f9f9",
        color: active ? "#fff" : "#333",
        cursor: "pointer",
    });

    return (
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
            {["all", "active", "completed"].map((f) => (
                <button key={f} onClick={() => setFilter(f)} style={buttonStyle(f === filter)}>
                    {f[0].toUpperCase() + f.slice(1)}
                </button>
            ))}
            <button onClick={toggleMultiWord} style={buttonStyle(false)}>
                {multiWordOnly ? "All Lengths" : "Multiword Only"}
            </button>
            <button
                onClick={clearCompleted}
                style={{ ...buttonStyle(false), backgroundColor: "#f44336", color: "#fff" }}
            >
                Clear Completed
            </button>
        </div>
    );
}