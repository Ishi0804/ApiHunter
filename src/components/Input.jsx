import React from 'react';
import { Form } from 'react-bootstrap';

const Input = ({ type, name, label, value, edit, onChange }) => {
    return (
        <Form.Group controlId={`form${name}${value}`} className="mb-4">
            <Form.Label
                className={type === 'radio' || type === 'checkbox' ? 'mx-3' : 'mx-0 fs-5'}
                style={{ color: '#4a90e2' }} // Custom label color
            >
                {label}
            </Form.Label>

            {/* Radio and Checkbox Inputs */}
            {type === 'radio' || type === 'checkbox' ? (
                <Form.Check
                    type={type}
                    name={name}
                    value={value}
                    checked={edit}
                    className="text-center mx-3"
                    style={{ fontSize: '1.1rem', color: '#333' }} // Custom styling
                    onChange={onChange}
                />
            ) : (
                <Form.Control
                    type={type}
                    name={name}
                    className="text-center p-3 border-2 rounded-3 shadow-sm"
                    style={{
                        borderColor: '#4a90e2', // Border color
                        fontSize: '1rem',
                        transition: 'border-color 0.3s ease', // Smooth transition for focus
                    }}
                    onChange={onChange}
                    value={edit || ''}
                    placeholder={`Enter ${label}`}
                />
            )}
        </Form.Group>
    );
};

export default Input;
