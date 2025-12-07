import React, { useState, useEffect, useCallback } from 'react';
import { Container, ListGroup, Alert, Spinner } from 'react-bootstrap';
import TaskForm from './components/taskform.jsx';
import TaskItem from './components/taskitem.jsx';
import Header from './components/header.jsx'; // <-- ADD THIS LINE
import * as api from './services/api.jsx';
// ... (rest of imports)
function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch todos
  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getTodos();
      console.log(response.data)
      setTodos(response.data);
    } catch (err) {
      setError('Could not connect to the backend API. Ensure Flask server is running.');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);


  // Handle adding a new task
  const handleAddTodo = async (taskName) => {
    try {
      const response = await api.createTodo(taskName);
      // Prepend the new task to the existing list
      setTodos([response.data, ...todos]); 
    } catch (err) {
      setError('Failed to add the task.');
      console.error('Error adding todo:', err);
    }
  };

  // Handle toggling the completion status
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const response = await api.updateTodoStatus(id, currentStatus);
      
      // Update the state with the modified task
      setTodos(todos.map(todo => 
        todo.id === id ? response.data : todo
      ));
    } catch (err) {
      setError('Failed to update task status.');
      console.error('Error toggling status:', err);
    }
  };

 // --- RENDERING ---
  return (
    <Container className="my-5" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4">To-Do List</h2>
      
      <TaskForm onAdd={handleAddTodo} />
      
      {/* Status Messages */}
      {error && <Alert variant="danger">{error}</Alert>}
      
      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : (
        <ListGroup>
          {todos.length === 0 ? (
            <Alert variant="info" className="text-center">
              No tasks yet! Add one above.
            </Alert>
          ) : (
            todos.map((todo) => (
              <TaskItem key={todo.id} todo={todo} onToggle={handleToggleStatus} />
            ))
          )}
        </ListGroup>
      )}
    </Container>
  );
}

export default App;