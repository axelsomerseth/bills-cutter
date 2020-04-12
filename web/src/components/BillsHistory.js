import React, { Fragment, useState, useEffect } from "react";
import { Table } from 'react-bootstrap';


const BillsHistory = () => {
    const [tableData, setTableData] = useState([]);
    let _props = {
        action: 'http://localhost:8080/history',
        method: 'POST',
        mode: 'cors'
    }
    const handleSubmit = () => {
        let formData = {};
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
            let tableDataTemp = Array.isArray(data) && data.length > 0 ? data : [];
            setTableData(tableDataTemp);
        });
    };

    useEffect(() => {
        handleSubmit();
    }, []);

    return (
        <Fragment>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>People</th>
                        <th>Bill Amount</th>
                        <th>Username</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.length > 0 && tableData.map((elem, index) => {
                        return (
                            <tr key={elem.id}>
                                <td>{elem.id}</td>
                                <td>{elem.numberOfPeople}</td>
                                <td>$ {elem.billAmount}</td>
                                <td>{elem.username}</td>
                                <td>{elem.notes}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Fragment>
    );
};


export default BillsHistory;