import React from "react";
import { Link } from "react-router-dom";

const CardImage = (props) => {
    return (
        <Link to={props.to} className="text-decoration-none">
            <div className="card text-center">
                <img className="card-img-top" src={props.img} alt={props.title} />
                <div className="card-body">
                    <h6 className="card-title text-capitalize">{props.title}</h6>
                    <div className="card-text text-success">{props.description}</div>
                </div>
            </div>
        </Link>
    );
};

export default CardImage;
