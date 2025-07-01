import { useState } from 'react';
import TaskCard from './TaskCard';

const Column = ({ title, tasks, addTask, moveTask, columns, currentColumn }) => {
    const [input, setInput] = useState('');

    const handleAdd = () => {
        if (input.trim()) {
            addTask(title, input.trim());
            setInput('');
        }
    };

    return (
        <div className="column">
            <h2>{title}</h2>
            <input
                type="text"
                placeholder="New task"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleAdd}>Add</button>
            {tasks.map(task => (
                <TaskCard
                    key={task.id}
                    task={task}
                    currentColumn={currentColumn}
                    moveTask={moveTask}
                    columns={columns}
                />
            ))}
        </div>
    );
};

export default Column;
