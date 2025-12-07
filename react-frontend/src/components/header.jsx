import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { FaTasks } from 'react-icons/fa'; // Requires 'react-icons' package (optional, but good practice)

function Header() {
  // If you haven't installed react-icons, remove the import and the <FaTasks /> tag
  // or install it: npm install react-icons

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="#">
          {/* Using a task icon for visual appeal */}
          <FaTasks className="me-2" /> 
          Full-Stack ToDo Manager
        </Navbar.Brand>
        {/* If you had more links, you could use <Nav> here */}
        <span className="navbar-text text-light">
          Built with React, Flask & Supabase
        </span>
      </Container>
    </Navbar>
  );
}

export default Header;