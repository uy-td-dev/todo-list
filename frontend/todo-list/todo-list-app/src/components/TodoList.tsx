import React from 'react';
import TodoItem from './TodoItem';

interface Todo {
    id: number;
    title: string;
}

interface TodoListProps {
    todos: Todo[];
    onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete }) => {
    return (
        <ul>
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
            ))}
        </ul>
    );
};

export default TodoList;