import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo } from '../services/api';

const TodoForm = () => {
  const [title, setTitle] = useState('');
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setTitle('');
    },
  });

  const generateInt16Id = () => {
    // Generate a random number within the range of int16 (0 to 32,767)
    return Math.floor(Math.random() * 32768);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      const newTodo = {
        id: generateInt16Id(), // Generate a random int16 id
        title,
      };
      createMutation.mutate(newTodo); // Pass the newTodo object
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a new todo"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;