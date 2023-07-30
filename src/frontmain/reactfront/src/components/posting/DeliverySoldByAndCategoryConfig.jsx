import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

const DeliverySoldByAndCategoryConfig = (props) => {
    const [title,setTitle] = useState('Category');

    const { name,category, setCategory } = props


    // const handleSoldByChange = (event) => {
    //     setSoldBy(event.target.value);
    // };

    const handleCategoryChange = (event) => {
        setTitle(event);
        setCategory(event);
        console.log(event);
    }



    return (
        <div>
        <DropdownButton id="dropdown-item-button" title={category?category:"Category"} style={{marginBottom:'20px'}}>
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
