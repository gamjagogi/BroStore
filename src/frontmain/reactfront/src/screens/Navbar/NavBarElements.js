import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import UserHeader from './UserHeader';


const NavBarElements = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">HJ-Store</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/software">Software Product</Nav.Link>
                        <Nav.Link href="/delivery">Delivery Product</Nav.Link>
                        <Nav.Link href="/board">User Board</Nav.Link>
                        <NavDropdown title="ACCOUNT" id="collasible-nav-dropdown" style={{width :'50%'}}>
                            <NavDropdown.Item href="#action/3.1" style={{ width: '50%', height: '100px' }}>
                                <UserHeader />
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">Notification</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Documentation
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBarElements
