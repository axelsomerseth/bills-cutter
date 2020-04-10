import React, { useState } from 'react';
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
            <Modal show={props.show} aria-labelledby="contained-modal-title-vcenter" centered autoFocus keyboard>
                <Modal.Header>
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
                                {/* <th>First Name</th> */}
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(
                                <tr>
                                    <td>{1}</td>
                                    <td>{props.username}</td>
                                    <td>$ {props.splitResult}</td>
                                </tr>
                            )}
                            {/* {tableData.length > 0 && tableData.map((elem, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{elem.username}</td>
                                        <td>$ {elem.splitResult}</td>
                                    </tr>
                                );
                            })} */}
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