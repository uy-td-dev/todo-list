import React, { useState } from 'react';

const TodoForm: React.FC<{ onAddTodo: (title: string) => void }> = ({ onAddTodo }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (title.trim()) {
            onAddTodo(title);
            setTitle('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter todo title"
            />
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default TodoForm;