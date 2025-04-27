export const fetchTodos = async () => {
  const response = await fetch('http://localhost:3000/todos');
  if (!response.ok) throw new Error('Failed to fetch todos');
  return response.json();
};

export const createTodo = async ({ id, title }: { id: number; title: string }) => {
  const response = await fetch('http://localhost:3000/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, title }),
  });
  if (!response.ok) throw new Error('Failed to create todo');
  return response.json();
};

export const deleteTodo = async (id: number) => {
  const response = await fetch(`http://localhost:3000/todos/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete todo with id ${id}`);
  }

  // Return nothing if the response body is empty (e.g., 204 No Content)
  return response.status === 204 ? null : response.json();
};