import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ReactStars from "react-rating-stars-component";
import {Button} from "react-bootstrap";


const PriceConfig = (props) => {
    const { setPrice,price, setOriginPrice,originPrice, setDiscountPrice,discountPrice
        , setDiscountPercent, discountPercent,setStar,star} = props


    const handlePriceChange = (event) => {
        const value = event.target.value;
        // 정규표현식을 사용하여 숫자인지 확인
        const regex = /^[0-9]*$/;

        if (regex.test(value)&&value.length<=10) {
            setPrice(value);
        }
    };

    const handleOriginPriceChange = (event) => {
        const value = event.target.value;
        // 정규표현식을 사용하여 숫자인지 확인
        const regex = /^[0-9]*$/;

        if (regex.test(value)&&value.length<=10) {
            setOriginPrice(value);
        }
    };

    const handleDiscountPriceChange = (event) => {
        const value = event.target.value;
        // 정규표현식을 사용하여 숫자인지 확인
        const regex = /^[0-9]*$/;

        if (regex.test(value)&&value.length<=10) {
            setDiscountPrice(value);
        }
    };

    const handleDiscountPercentChange = (event) => {
        const value = event.target.value;
        // 정규표현식을 사용하여 숫자인지 확인
        const regex = /^[0-9]*$/;

        if (regex.test(value) && value.length<=10) {
            setDiscountPercent(value);
        }
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

    const onClickResetPrice = () => {
        setPrice('');
    }
    const onClickResetOriginPrice = () => {
        setOriginPrice('');
    }
    const onClickResetDiscountPirce = () => {
        setDiscountPrice('');
    }
    const onClickResetDiscountPercent = () => {
        setDiscountPercent('');
    }


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
                <Button style={{color:'red'}} variant="outline-secondary" onClick={onClickResetPrice}>reset</Button>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text>Origin Price</InputGroup.Text>
                <Form.Control
                    aria-label="Amount (to the nearest dollar)"
                    onChange={handleOriginPriceChange}
                    value={originPrice}
                />
                <InputGroup.Text>원</InputGroup.Text>
                <Button style={{color:'red'}} variant="outline-secondary" onClick={onClickResetOriginPrice}>reset</Button>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text>Discount Price</InputGroup.Text>
                <Form.Control
                    aria-label="Amount (to the nearest dollar)"
                    onChange={handleDiscountPriceChange}
                    value={discountPrice}
                />
                <InputGroup.Text>원</InputGroup.Text>
                <Button style={{color:'red'}} variant="outline-secondary" onClick={onClickResetDiscountPirce}>reset</Button>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text>Discount Percent</InputGroup.Text>
                <Form.Control
                    aria-label="Amount (to the nearest dollar)"
                    onChange={handleDiscountPercentChange}
                    value={discountPercent}
                />
                <InputGroup.Text>%</InputGroup.Text>
                <Button style={{color:'red'}} variant="outline-secondary" onClick={onClickResetDiscountPercent}>reset</Button>
            </InputGroup>
            <div className="App" style={{marginRight : '20px'}}>
                <ReactStars {...thirdExample} />
                {/* <Rate /> */}
            </div>
        </div>
    );
};

export default PriceConfig;
