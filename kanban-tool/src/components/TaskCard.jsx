import React from 'react';

const TaskCard = ({ task, currentColumn, moveTask, columns }) => {
    const moveTo = columns.filter(c => c !== currentColumn);

    return (
        <div className="task-card">
            <p>{task.content}</p>
            {moveTo.map((targetCol) => (
                <button
                    key={targetCol}
                    onClick={() => moveTask(currentColumn, targetCol, task.id)}
                >
                    Move to {targetCol}
                </button>
            ))}
        </div>
    );
};

export default TaskCard;

