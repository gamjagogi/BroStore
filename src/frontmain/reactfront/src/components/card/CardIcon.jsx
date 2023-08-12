import React from "react";
import { Link } from "react-router-dom";
import './css/Card.css';

const CardIcon = (props) => {
  return (
    <Link to={props.to} className="text-decoration-none">
      <div className="card text-center">
        <div className="card-body">
          {props.children}
          <h6 className="card-title text-capitalize">{props.title}</h6>
          <small className="text-muted overflow-ellipsis">{props.tips}</small>
        </div>
      </div>
    </Link>
  );
};

export default CardIcon;
