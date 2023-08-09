import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {ReactComponent as IconHeartFill} from "bootstrap-icons/icons/heart-fill.svg";
import {ReactComponent as IconTrash} from "bootstrap-icons/icons/trash.svg";


const PurchaseProduct = (props) => {

    const {item, handleDelete} = props;
    const [count, setCount] = useState(item.count);
    const [cartItemId, setCartItemId ] = useState(item.cartItemId);
    console.log("카트 프로덕트 진입");

    console.log(item);


        return (
            <tr>
                <td>
                    <div className="row">
                        <div className="col-3 d-none d-md-block">
                            <img
                                src={item.thumbnail}
                                width="70"
                                alt="..."
                            />
                        </div>
                        <div className="col" style={{width: '200px'}}>
                            <Link
                                to={item.link + item.id}
                                className="text-decoration-none"
                            >
                                {item.name}
                            </Link>
                            <p className="small text-muted">
                                Option
                            </p>
                        </div>
                    </div>
                </td>
                <td>
                    <span>{count}</span>
                </td>
                <td>
                    <var className="price">{item.price}</var>
                    <small className="d-block text-muted">
                        {item.discountPrice}
                    </small>
                </td>
            </tr>
        )
}
export default PurchaseProduct;