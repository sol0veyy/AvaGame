import React from "react";
import Form from 'react-bootstrap/Form';
import "./select.css"

const Select = ({options}) => {
    return (
        <Form.Select className="select">
            {options.map((option) => (
                <option key={option}>{option}</option>
            ))}
        </Form.Select>
    )
}

export default Select;