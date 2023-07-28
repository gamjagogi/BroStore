import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ReactStars from "react-rating-stars-component";


const PriceConfig = (props) => {
    const { setPrice,price, setOriginPrice,originPrice, setDiscountPrice,discountPrice
        , setDiscountPercent, discountPercent,setStar,star} = props

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleOriginPriceChange = (event) => {
        setOriginPrice(event.target.value);
    };

    const handleDiscountPriceChange = (event) => {
        setDiscountPrice(event.target.value);
    };

    const handleDiscountPercentChange = (event) => {
        setDiscountPercent(event.target.value);
    };

    const handleStarChange = (event) => {
        setStar(event);
    }

    const thirdExample = {
        size: 40,
        count: 5,
        isHalf: false,
        value: star,
        color: "grey",
        activeColor: "yellow",
        onChange: handleStarChange
    };
    const r = {
        defaultValue: 4,
        min: 0,
        max: 5,
        step: 0.5
    };


    return (
        <div>
            <InputGroup className="mb-3">
                <InputGroup.Text>Price</InputGroup.Text>
                <Form.Control
                    aria-label="Amount (to the nearest dollar)"
                    onChange={handlePriceChange}
                    value={price}
                />
                <InputGroup.Text>원</InputGroup.Text>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text>Origin Price</InputGroup.Text>
                <Form.Control
                    aria-label="Amount (to the nearest dollar)"
                    onChange={handleOriginPriceChange}
                    value={originPrice}
                />
                <InputGroup.Text>원</InputGroup.Text>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text>Discount Price</InputGroup.Text>
                <Form.Control
                    aria-label="Amount (to the nearest dollar)"
                    onChange={handleDiscountPriceChange}
                    value={discountPrice}
                />
                <InputGroup.Text>원</InputGroup.Text>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text>Discount Percent</InputGroup.Text>
                <Form.Control
                    aria-label="Amount (to the nearest dollar)"
                    onChange={handleDiscountPercentChange}
                    value={discountPercent}
                />
                <InputGroup.Text>%</InputGroup.Text>
            </InputGroup>
            <div className="App" style={{marginRight : '20px'}}>
                <ReactStars {...thirdExample} />
                {/* <Rate /> */}
            </div>
        </div>
    );
};

export default PriceConfig;
