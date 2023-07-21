import React from "react";
import {Link} from "react-router-dom";

const FilterCategory = (props) => {
    const {onChangeCategory} = props;

    const handleCategoryChange = (event) => {
        console.log(event);
        onChangeCategory(event);
    }


    return (
        <div className="card mb-3 accordion">
            <div
                className="card-header fw-bold text-uppercase accordion-icon-button"
                data-bs-toggle="collapse"
                data-bs-target="#filterCategory"
                aria-expanded="true"
                aria-controls="filterCategory"
            >
                Categories
            </div>
            <ul
                className="list-group list-group-flush show"
                id="filterCategory"
            >
                <li className="list-group-item">
                    <button onClick={() => handleCategoryChange('All')}
                            className="btn btn-link text-decoration-none">
                        All
                    </button>
                </li>
                <li className="list-group-item">
                    <button onClick={() => handleCategoryChange('Electronics')}
                            className="btn btn-link text-decoration-none">
                        Electronics
                    </button>
                </li>
                <li className="list-group-item">
                    <button onClick={() => handleCategoryChange('Clothes')}
                            className="btn btn-link text-decoration-none">
                        Clothes
                    </button>
                </li>
                <li className="list-group-item">
                    <button onClick={() => handleCategoryChange('Toy')}
                            className="btn btn-link text-decoration-none">
                        Toy
                    </button>
                </li>
                <li className="list-group-item">
                    <button to="/" className="btn btn-link text-decoration-none">
                        ..
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default FilterCategory;
