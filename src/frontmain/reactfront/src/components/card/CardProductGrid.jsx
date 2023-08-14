import React, {useState} from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";

const CardProductGrid = (props) => {

  const product = props.data;
  const parser = new DOMParser();
  const doc = parser.parseFromString(product.description, "text/html");
  console.log(doc);


  const plainText = doc.body.textContent;
  console.log(plainText);


  return (
    <div className="card">
      <div className="col-md-3 text-center">
        {product.thumbnail?(<img src={product.thumbnail} className="img-fluid" alt="..." />)
            :""}
      </div>
      {product.isNew && (
        <span className="badge bg-success position-absolute mt-2 ms-2">
          New
        </span>
      )}
      {product.isHot && (
        <span className="badge bg-danger position-absolute r-0 mt-2 me-2">
          Hot
        </span>
      )}
      {(product.discountPercentage > 0 || product.discountPrice > 0) && (
        <span
          className={`rounded position-absolute p-2 bg-warning  ms-2 small ${
            product.isNew ? "mt-5" : "mt-2"
          }`}
        >
          -
          {product.discountPercentage > 0
            ? product.discountPercentage + "%"
            : "$" + product.discountPrice}
        </span>
      )}
      <div className="card-body">
        <h6 className="card-subtitle mb-2">
          <Link to={product.link + product.id} className="text-decoration-none">
            {product.name}
          </Link>
        </h6>
        <div className="my-2">
          <span className="fw-bold h5">${product.price}</span>
          {product.originPrice > 0 && (
            <del className="small text-muted ms-2">${product.originPrice}</del>
          )}
          <span className="ms-2">
            {Array.from({ length: product.star }, (_, key) => (
              <IconStarFill className="text-warning me-1" key={key} />
            ))}
          </span>
        </div>
        <div className="my-2">
          <span className="fw-bold h9">Category : {product.category}</span>
        </div>
      </div>
    </div>
  );
};

export default CardProductGrid;
