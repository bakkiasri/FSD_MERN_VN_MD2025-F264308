import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          MyApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>

            <NavDropdown title="Products" id="product-dropdown">
              <NavDropdown.Item as={Link} to="/product/electronics">
                Electronics
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/product/fashion">
                Fashion
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/product">
                All
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
