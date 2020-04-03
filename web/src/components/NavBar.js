import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";
import { Navbar, Button } from 'react-bootstrap';

const NavBar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <div>
            {!isAuthenticated && (
                <Navbar className="navigation">
                    <Navbar.Brand>
                        <Link to="/">Bills Cutter</Link>&nbsp;
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Button variant="link" onClick={() => loginWithRedirect({})}>Log in</Button>
                    </Navbar.Collapse>
                </Navbar>
            )}

            {isAuthenticated && (
                <Navbar className="navigation">
                    <Navbar.Brand>
                        <Link to="/">Bills Cutter</Link>&nbsp;
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Link to="/profile">Profile</Link>
                        </Navbar.Text>
                        <Button variant="link" onClick={() => logout()}> Log out </Button>
                    </Navbar.Collapse>
                </Navbar>
            )}
        </div>
    );
};

export default NavBar;