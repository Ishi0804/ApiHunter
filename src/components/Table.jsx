import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TableComp = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const dataget = await axios.get('http://localhost:3000/data');
            setData(dataget.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleAdd = () => {
        navigate('/');
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/data/${id}`);
            getData(); // Reload data after delete
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleEdit = (id) => {
        navigate(`/${id}`);
    };

    return (
        <Container className="mt-4">
            
            <Table striped bordered hover responsive className=" rounded">
                <thead className="table-light">
                    <tr>
                        <th>Sr. No</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Hobby</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((val, key) => (
                        <tr key={key} className="table-hover">
                            <td>{key + 1}</td>
                            <td>{val.first_name + " " + val.last_name}</td>
                            <td>{val.gender}</td>
                            <td>{val.email}</td>
                            <td>{val.mobile}</td>
                            <td>{val.finalHobby}</td>
                            <td>
                                <Button
                                    variant="danger"
                                    className="mx-2"
                                    onClick={() => handleDelete(val.id)}
                                >
                                    Delete
                                </Button>
                                <Button
                                    variant="warning"
                                    className="mx-2"
                                    onClick={() => handleEdit(val.id)}
                                >
                                    Edit
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Button
                variant="success"
                className="m-4 "
                onClick={handleAdd}
                size="lg"
            >
                Add New Data
            </Button>
        </Container>
    );
};

export default TableComp;
