import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>Todo List</h1>
        <TodoForm />
        <TodoList />
      </div>
    </QueryClientProvider>
  );
};

export default App;
