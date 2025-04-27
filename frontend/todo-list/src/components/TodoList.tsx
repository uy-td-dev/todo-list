import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodos, deleteTodo } from '../services/api';

const TodoList = () => {
  const queryClient = useQueryClient();
  const { data: todos, isLoading, isError } = useQuery({ queryKey: ['todos'], queryFn: fetchTodos });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      // Invalidate the 'todos' query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      console.error('Failed to delete todo:', error);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading todos</p>;

  return (
    <ul>
      {todos?.map((todo: { id: number; title: string }) => (
        <li key={todo.id}>
          {todo.title}
          <button onClick={() => deleteMutation.mutate(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;