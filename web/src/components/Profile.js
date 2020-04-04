import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Card, CardDeck } from 'react-bootstrap';

const Profile = () => {
    const { loading, user } = useAuth0();

    if (loading || !user) {
        return <div>Loading...</div>;
    }

    return (
        <Fragment>
            {/* <div id="App-content" className="App-content"> */}
            <Card bg="light" text="success" className="profile-card">
                <Card.Header as="h5">Welcome!</Card.Header>
                <Card.Img variant="top" src={user.picture} alt="Profile" />
                <Card.Body>
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
                    <Card.Text>
                        {/* <code>{JSON.stringify(user, null, 2)}</code> */}
                    </Card.Text>
                </Card.Body>
            </Card>
            {/* </div> */}
        </Fragment>
    );
};

export default Profile;