import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { getTodos, createTodo, deleteTodo } from './services/api';

const App: React.FC = () => {
    const [todos, setTodos] = useState<any[]>([]);

    useEffect(() => {
        const fetchTodos = async () => {
            const todosData = await getTodos();
            setTodos(todosData);
        };
        fetchTodos();
    }, []);

    const handleCreateTodo = async (title: string) => {
        const newTodo = await createTodo(title);
        setTodos([...todos, newTodo]);
    };

    const handleDeleteTodo = async (id: string) => {
        await deleteTodo(id);
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="App">
            <h1>Todo List</h1>
            <TodoForm onCreateTodo={handleCreateTodo} />
            <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} />
        </div>
    );
};

export default App;