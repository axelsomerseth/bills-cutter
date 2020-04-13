import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import SplitResult from "./SplitResult";
import { useAuth0 } from "../react-auth0-spa";


const FeedForm = () => {
    const [numberOfPeople, setNumberOfPeople] = useState(0);
    const [billAmount, setBillAmount] = useState(0);
    const [username, setUsername] = useState('Unregistered');
    const [notes, setNotes] = useState('');
    const [splitResult, setSplitResult] = useState(0);
    const [modalShow, setModalShow] = useState(false);
    const { loading, user } = useAuth0();
    let _props = {
        action: 'http://localhost:8080/api',
        method: 'POST',
        mode: 'cors'
    }

    useEffect(() => {
        // document.title = `Welcome, ${username}!`;
    });

    const handleSubmit = event => {
        event.preventDefault();
        if (!loading && user) {
            setUsername(user.nickname);
        }
        let formData = {
            numberOfPeople: Number(numberOfPeople),
            billAmount: !isNaN(Number(billAmount)) ? Number(billAmount) : 0,
            username: user && user.nickname ? user && user.nickname : username,
            notes: notes
        };
        let url = _props.action;
        let method = _props.method;
        let mode = _props.mode;
        const requestOptions = {
            method: method,
            mode: mode,
            referrerPolicy: 'origin-when-cross-origin',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(formData)
        };
        fetch(url, requestOptions).then(response => response.json()).then(data => {
            setSplitResult(!isNaN(data.money) ? data.money : 0);
            setModalShow(true);
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group controlId="feedForm.numberOfPeople">
                    <Form.Label>Number of people</Form.Label>
                    <Form.Control as="select" value={numberOfPeople} name="numberOfPeople" onChange={event => setNumberOfPeople(event.target.value)}>
                        <option>Choose...</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                    </Form.Control>
                    <Form.Text className="text-muted">
                        Please select the quantity of people.
                    </Form.Text>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group controlId="feedForm.billAmount">
                    <Form.Label>Bill amount</Form.Label>
                    <Form.Control name="billAmount" type="number" value={billAmount} onChange={event => setBillAmount(event.target.value)} />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group controlId="feedForm.notes">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control as="textarea" rows="3" name="notes" value={notes} onChange={event => setNotes(event.target.value)} />
                </Form.Group>
            </Form.Row>
            <Button variant="success" type="submit">
                Submit
            </Button>
            <SplitResult show={modalShow} onHide={() => setModalShow(false)} username={username} splitResult={splitResult} />
        </Form>
    );
};


export default FeedForm;