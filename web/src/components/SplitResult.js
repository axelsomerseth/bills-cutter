import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';


const SplitResult = (props) => {
    let tableData = [];
    if (props.username && props.splitResult) {
        tableData.push({
            username: props.username,
            splitResult: props.splitResult
        });
    }
    return (
        <>
            <Modal show={props.show} onHide={props.onHide} aria-labelledby="contained-modal-title-vcenter" centered autoFocus keyboard>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Results
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Result of your splitted bill
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{1}</td>
                                <td>{props.username}</td>
                                <td>$ {props.splitResult}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={props.onHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default SplitResult;