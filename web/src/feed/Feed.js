import React from 'react';
import './Feed.css';
import { Form, Button } from 'react-bootstrap';

class FeedForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { numberOfPeople: 0, billAmount: 0 };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }
    handleSubmit(event) {
        let action = this.props.action;
        let method = this.props.method;
        let mode = this.props.mode;
        event.preventDefault();
        let formData = { numberOfPeople: Number(this.state.numberOfPeople), billAmount: Number(this.state.billAmount) };
        this.getData(formData);
    }
    getData(formData) {
        let url = this.props.action;
        let method = this.props.method;
        let mode = this.props.mode;
        let tryGetJson = function (response) {
            return response.text().then(function (text) {
                return text ? JSON.parse(text) : {}
            })
        };
        const requestOptions = {
            method: method,
            mode: mode,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        };
        // TODO: Review .json() method, is not working
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    }
    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                {/* <Form.Group controlId="formBasicRange">
                    <Form.Label>Range</Form.Label>
                    <Form.Control type="range" />
                </Form.Group> */}
                <Form.Group controlId="feedFormNumberOfPeople">
                    <Form.Label>Number of people</Form.Label>
                    <Form.Control name="numberOfPeople" type="number" value={this.state.numberOfPeople} onChange={this.handleChange} />
                    <Form.Text className="text-muted">
                        Please enter the quantity of people.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="feedFormBillAmount">
                    <Form.Label>Bill amount</Form.Label>
                    <Form.Control name="billAmount" type="number" value={this.state.billAmount} onChange={this.handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}
export default FeedForm;