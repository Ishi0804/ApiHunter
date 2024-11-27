import React, { useEffect, useState } from 'react';
import Input from './Input';
import { Button, Form, Row, Col, Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const FormComp = () => {

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            handleEdit(id);
        }
    }, [id]);

    const [input, setInput] = useState({});
    const [data, setData] = useState([]);
    const [hobby, setHobby] = useState([]);

    const type = [
        { name: 'first_name', type: 'text', label: 'First Name' },
        { name: 'last_name', type: 'text', label: 'Last Name' },
        { name: 'email', type: 'email', label: 'Email' },
        { name: 'mobile', type: 'number', label: 'Mobile Number' },
        { name: 'gender', type: 'radio', label: 'Male', value: 'male' },
        { name: 'gender', type: 'radio', label: 'Female', value: 'female' },
        { name: 'hobby', type: 'checkbox', label: 'Cricket', value: 'Cricket' },
        { name: 'hobby', type: 'checkbox', label: 'Football', value: 'Football' },
        { name: 'hobby', type: 'checkbox', label: 'Swimming', value: 'Swimming' }
    ];

    const handleInput = (e) => {
        let { name, value } = e.target;
        if (name === 'hobby') {
            e.target.checked
                ? setHobby([...hobby, value])
                : setHobby(hobby.filter(h => h !== value));
        } else {
            setInput({ ...input, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let finalHobby = hobby.toString();
        const finalData = { ...input, finalHobby };

        setData((data) => [...data, finalData]);
        addData(finalData);
    };

    const addData = async (data) => {
        try {
            if (id) {
                const response = await axios.put(`http://localhost:3000/data/${id}`, data);
            } else {
                const response = await axios.post('http://localhost:3000/data', data);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleEdit = async (id) => {
        const editData = await axios.get(`http://localhost:3000/data/${id}`);
        setInput({ ...editData.data, finalHobby: editData.data.finalHobby });
        console.log(editData.data);
    };

    return (
        <Container className="p-5 border rounded shadow-lg">
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    {type.slice(0, 2).map((val) => (
                        <Col sm={12} md={6} key={val.name}>
                            <Input
                                name={val.name}
                                type={val.type}
                                label={val.label}
                                onChange={handleInput}
                                value={input[val.name] || ''}
                            />
                        </Col>
                    ))}
                </Row>

                <Row className="mb-3">
                    {type.slice(2, 4).map((val) => (
                        <Col sm={12} md={6} key={val.name}>
                            <Input
                                name={val.name}
                                type={val.type}
                                label={val.label}
                                onChange={handleInput}
                                value={input[val.name] || ''}
                            />
                        </Col>
                    ))}
                </Row>

                <div className="mb-3">
                    {type.slice(4).map((val) => (
                        <div key={val.value} className="form-check form-check-inline">
                            <Input
                                name={val.name}
                                type={val.type}
                                label={val.label}
                                value={val.value}
                                onChange={handleInput}
                                checked={val.type === 'checkbox' ? hobby.includes(val.value) : input[val.name] === val.value}
                            />
                        </div>
                    ))}
                </div>

                <div className="d-flex justify-content-evenly">
                    <Button type="submit" className="px-5 mt-3" variant="primary">
                        {id ? 'Update' : 'Submit'}
                    </Button>
                    <Link to="/table">
                        <Button className="px-5 mt-3" variant="secondary">
                            Show Data
                        </Button>
                    </Link>
                </div>
            </Form>
        </Container>
    );
};

export default FormComp;
