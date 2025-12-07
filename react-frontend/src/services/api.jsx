import axios from 'axios';

// Get API base URL from the .env file
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTodos = async () => {
  return apiClient.get('/todos');
};

export const createTodo = async (taskName) => {
  return apiClient.post('/todos', { title: taskName });
};

export const updateTodoStatus = async (id, isComplete) => {
  return apiClient.put(`/todos/${id}`, { is_complete: isComplete });
};

// Add export const deleteTodo = (id) => apiClient.delete(`/todos/${id}`); if needed