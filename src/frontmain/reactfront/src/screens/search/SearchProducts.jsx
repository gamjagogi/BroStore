import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";



const SearchProduct = (props) => {

    const {item} = props;

    return (
        <tr>
            <td>
                <div className="row">
                    <div className="d-block text-muted">
                        <img
                            src={item.thumbnail}
                            width="70"
                            alt="..."
                        />
                    </div>
                </div>
            </td>
            <td>
                <div className="d-block text-muted">
                    <div >
                        <Link
                            to={item.link + item.id}
                            className="text-decoration-none"
                        >
                            {item.title}
                        </Link>
                    </div>
                </div>
            </td>
            <td>
                <small className="d-block text-muted">
                    {item.content}
                </small>
            </td>
            <td className="text-end">
                <div className="input-group input-group-sm mw-140">
                    <span>{item.username}</span>
                </div>
            </td>
        </tr>
    )
}
export default SearchProduct;