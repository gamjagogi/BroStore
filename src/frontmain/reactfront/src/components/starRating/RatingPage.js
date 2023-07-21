import "./styles.css";
import React from "react";
import ReactStars from "react-rating-stars-component";

const RatingPage = () => {
    const thirdExample = {
        size: 40,
        count: 5,
        isHalf: false,
        value: 4,
        color: "grey",
        activeColor: "yellow",
        onChange: (newValue) => {
            console.log(`Example 3: new value is ${newValue}`);
        }
    };
    const r = {
        defaultValue: 4,
        min: 0,
        max: 5,
        step: 0.5
    };
    return (
        <div className="App" style={{marginRight : '20px'}}>
            <ReactStars {...thirdExample} />
            {/* <Rate /> */}
        </div>
    );
}

export default RatingPage