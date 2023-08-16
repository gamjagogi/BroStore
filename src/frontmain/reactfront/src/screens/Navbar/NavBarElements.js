import React, {useEffect,useState} from 'react'
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import UserHeader from './UserHeader';
import "./NavBarElements.css";


const NavBarElements = () => {
    const [isManager, setIsManager] = useState(false);
    const userDataString = sessionStorage.getItem('userRole');
    const userRole = userDataString ? JSON.parse(userDataString) : null;
    useEffect(() => {
        if (userRole=="ROLE_ADMIN"||userRole=="ROLE_MANAGER") {
            setIsManager(true);
            console.log(userDataString);
        }
    }, [userRole]);

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">BRO-Store</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/software" className="navbar-text">Software Product</Nav.Link>
                        <Nav.Link href="/delivery" className="navbar-text">Delivery Product</Nav.Link>
                        <Nav.Link href="/board" className="navbar-text">User Board</Nav.Link>
                    </Nav>
                    <div className="container col-2">
                    <Nav className="me-auto align-items-center">
                        <NavDropdown title="ACCOUNT" id="collasible-nav-dropdown">
                            <NavDropdown.Item>
                                <UserHeader />
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </div>
                    <Nav className="me-auto">
                        <Nav.Link href="/question" >Question</Nav.Link>
                        <Nav.Link href="/notice">Notification</Nav.Link>
                        <Nav.Link eventKey={2} href="/document">
                            Document
                        </Nav.Link>
                        {isManager ? (<Nav.Link href="/selling">SellerPage</Nav.Link>):''}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBarElements
