import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import apiCall from '../api'

function Header(props) {
    const logout = () => {
        apiCall("get", "/auth/logout")
            .then(() => {
                props.updateAuth({}, false);
            })
    }
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand as={Link} to="/">yDown</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Library</Nav.Link>
                </Nav>
                <Nav>
                    {props.isLoggedIn ? 
                        <>
                            <p>{props.user.username}</p>
                            <a href="#" className="nav nav-link" onClick={logout}>Log Out</a>
                        </>
                        :
                        <>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                        </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header