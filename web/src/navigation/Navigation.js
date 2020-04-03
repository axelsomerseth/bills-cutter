import React from 'react';
import { Navbar } from 'react-bootstrap';
import './Navigation.css';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '' };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }
    render() {
        return (
            <Navbar>
                <Navbar.Brand href="#home">BillsCutter</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="#login"> {this.state.username} </a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default Navigation;