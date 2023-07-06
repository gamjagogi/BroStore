import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import UserHeader from '../Navbar/UserHeader';


const NavBarElements = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Macro-Store</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/software">Software Product</Nav.Link>
                        <Nav.Link href="/Questions">Delivery Product</Nav.Link>
                        <Nav.Link href="#deets">User Board</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">Notification</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Documentation
                        </Nav.Link>
                        <UserHeader />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBarElements
