import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function TaskForm({ onAdd }) {
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskName = newTask.trim();
    if (taskName) {
      onAdd(taskName);
      setNewTask('');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group className="d-flex">
        <Form.Control
          type="text"
          placeholder="What needs to be done?"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          required
        />
        <Button variant="primary" type="submit" className="ms-2">
          Add Task
        </Button>
      </Form.Group>
    </Form>
  );
}

export default TaskForm;