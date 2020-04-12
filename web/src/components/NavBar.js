import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";
import { Navbar, Button, Nav, Form } from 'react-bootstrap';

const NavBar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <div>
            {!isAuthenticated && (
                <Navbar variant="money">
                    <Navbar.Brand>
                        <Link className="link" to="/">Bills Cutter</Link>&nbsp;
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {/* <Link className="link" to="/profile">Profile</Link> */}
                        </Nav>
                    </Navbar.Collapse>
                    <Form inline className="justify-content-end">
                        <Button variant="outline-light" onClick={() => loginWithRedirect({})}>Log in</Button>
                    </Form>
                </Navbar>
            )}

            {isAuthenticated && (
                <Navbar variant="money">
                    <Navbar.Brand>
                        <Link className="link" to="/">Bills Cutter</Link>&nbsp;
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Link className="nav-link link" to="/profile">Profile</Link>
                            <Link className="nav-link link" to="/history">History</Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Form inline className="justify-content-end">
                        <Button variant="outline-light" onClick={() => logout()}> Log out </Button>
                    </Form>
                </Navbar>
            )}
        </div>
    );
};

export default NavBar;