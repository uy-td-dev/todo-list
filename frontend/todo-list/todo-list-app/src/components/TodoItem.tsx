import React from 'react';

interface TodoItemProps {
    id: number;
    title: string;
    onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, onDelete }) => {
    return (
        <div className="todo-item">
            <span>{title}</span>
            <button onClick={() => onDelete(id)}>Delete</button>
        </div>
    );
};

export default TodoItem;