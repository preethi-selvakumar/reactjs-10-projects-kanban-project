import { useState } from 'react';
import Column from './Column';

const Board = () => {
    const [columns, setColumns] = useState({
        'To Do': [],
        'In Progress': [],
        'Done': [],
    });

    const addTask = (column, text) => {
        const newTask = { id: Date.now(), content: text };
        setColumns({
            ...columns,
            [column]: [...columns[column], newTask],
        });
    };

    const moveTask = (fromColumn, toColumn, taskId) => {
        const taskToMove = columns[fromColumn].find(task => task.id === taskId);
        if (!taskToMove) return;
        setColumns({
            ...columns,
            [fromColumn]: columns[fromColumn].filter(task => task.id !== taskId),
            [toColumn]: [...columns[toColumn], taskToMove],
        });
    };

    return (
        <div className="board">
            {Object.keys(columns).map((col) => (
                <Column
                    key={col}
                    title={col}
                    tasks={columns[col]}
                    addTask={addTask}
                    moveTask={moveTask}
                    columns={Object.keys(columns)}
                    currentColumn={col}
                />
            ))}
        </div>
    );
};

export default Board;
