import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

function TaskItem({ todo, onToggle }) {
  const { id, title, is_complete } = todo;

  return (
    <ListGroup.Item 
      className="d-flex justify-content-between align-items-center"
      // Apply different background color for completed tasks
      variant={is_complete ? 'success' : 'light'} 
    >
      <span 
        style={{ 
          textDecoration: is_complete ? 'line-through' : 'none', 
          color: is_complete ? '#555' : '#000',
          cursor: 'pointer'
        }}
        // Toggle status when text is clicked
        onClick={() => onToggle(id, !is_complete)}
      >
        {title}
      </span>
      
      <Button 
        variant={is_complete ? 'warning' : 'success'} 
        size="sm"
        onClick={() => onToggle(id, !is_complete)}
      >
        {is_complete ? 'Undo' : 'Complete'}
      </Button>
    </ListGroup.Item>
  );
}

export default TaskItem;