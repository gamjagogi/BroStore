import React from "react";
import {Link} from "react-router-dom";
import "./css/Card.css";

const HomeCardIcon = (props) => {
    return (
        <Link to={props.to} className="text-decoration-none">
            <div className="card text-center">
                <div className="card-body">
                    <img className="card-img-top"
                         src={props.img}
                         alt={props.title}
                         style={{
                             maxWidth: '100%',
                             maxHeight: '90px',
                         }}
                    />
                    <h6 className="card-title text-capitalize overflow-ellipsis">{props.title}</h6>
                    <div className="card-text text-success overflow-ellipsis">{props.description}</div>
                </div>
            </div>
        </Link>
    );
};

export default HomeCardIcon;
