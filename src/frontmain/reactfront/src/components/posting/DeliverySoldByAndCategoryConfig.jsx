import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

const DeliverySoldByAndCategoryConfig = (props) => {
    const [title,setTitle] = useState('Category');

    const { name,category, setCategory } = props;

    const handleCategoryChange = (event) => {
        setTitle(event);
        setCategory(event);
        console.log(event);
    }



    return (
        <div>
        <DropdownButton id="dropdown-item-button" placeholder='Category' title={category?category:'All'} style={{marginBottom:'20px',marginRight:'-180px'}}>
            <Dropdown.Item as="button" onClick={() => handleCategoryChange('All')} >All</Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => handleCategoryChange('Electronics')} >Electronics</Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => handleCategoryChange('Clothes')}>Clothes</Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => handleCategoryChange('Toy')}>Toy</Dropdown.Item>
        </DropdownButton>

            <InputGroup className="mb-3">
                <InputGroup.Text>Sold By</InputGroup.Text>
                <Form.Control
                    aria-label="Amount (to the nearest dollar)"
                    value={name}
                    disabled
                />
            </InputGroup>
        </div>
    );
};

export default DeliverySoldByAndCategoryConfig;
