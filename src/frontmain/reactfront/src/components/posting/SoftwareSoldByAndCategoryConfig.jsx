import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

const SoftwareSoldByAndCategoryConfig = (props) => {

    const { soldBy, setCategory,category } = props


    const handleCategoryChange = (event) => {
        setCategory(event);
        console.log(event);
    }



    return (
        <div className="col-sm-auto" style={{marginLeft:'10px'}}>
        <DropdownButton id="dropdown-item-button" title={category?category:'All'} style={{marginBottom:'20px'}}>
            <Dropdown.Item as="button" onClick={() => handleCategoryChange('All')} >All</Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => handleCategoryChange('Web Crawling')} >Web Crawling</Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => handleCategoryChange('Monitoring')}>Monitoring</Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => handleCategoryChange('Macro')}>Macro</Dropdown.Item>
        </DropdownButton>

            <InputGroup className="mb-3">
                <InputGroup.Text>Sold By</InputGroup.Text>
                <Form.Control
                    aria-label="Amount (to the nearest dollar)"
                    value={soldBy}
                    style={{width:'100px'}}
                    disabled
                />
            </InputGroup>
        </div>
    );
};

export default SoftwareSoldByAndCategoryConfig;
