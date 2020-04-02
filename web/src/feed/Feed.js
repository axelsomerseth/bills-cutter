import React from 'react';
import './Feed.css';
import '../bootstrap.css';

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
            <form onSubmit={this.handleSubmit}>
                <label>
                    Number of people:
                    <input className="feed-form-inputs" name="numberOfPeople" type="number" value={this.state.numberOfPeople} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Bill amount:
                    <input className="feed-form-inputs" name="billAmount" type="number" value={this.state.billAmount} onChange={this.handleChange} />
                </label>
                <br />
                <input className="buttons" type="submit" value="Submit" />
            </form>
        );
    }
}
export default FeedForm;