import React from "react";
import Form from 'react-bootstrap/Form';
import "./select.css"

const Select = ({options, setTime, setCategory}) => {
    return (
        <Form.Select className="select" onChange={(e) => {
            setTime ? 
            setTime(e.target.value)
            : 
            setCategory(e.target.value)
        }}>
            {options.map((option) => (
                <option value={option.value} key={option.name}>{option.name}</option>
            ))}
        </Form.Select>
    )
}

export default Select;