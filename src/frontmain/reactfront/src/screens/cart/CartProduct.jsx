import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {ReactComponent as IconHeartFill} from "bootstrap-icons/icons/heart-fill.svg";
import {ReactComponent as IconTrash} from "bootstrap-icons/icons/trash.svg";


const CartProduct = (props) => {

    const {item, handleDelete, handleCountChange} = props;
    const [count, setCount] = useState(item.count);
    const [cartItemId, setCartItemId] = useState(item.cartItemId);
    console.log("카트 프로덕트 진입");

    console.log(item);

    useEffect(() => {
        if(count==0){
            handleDelete(cartItemId);
        }else{
            handleCountChange(cartItemId, count);
        }
    }, [count])

    const onCountUp = async () => {
        setCount(count + 1);
    }

    const onCountDown = async () => {
        setCount(count - 1);
    }

    const onChangeValue = async (event) => {
        setCount(event.target.value - 0);
    }

    const onClickDelete = async () => {
        handleDelete(cartItemId);
    }


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
                <div className="input-group input-group-sm mw-140">
                    <button
                        className="btn btn-primary text-white"
                        type="button"
                        onClick={onCountDown}
                    >
                        <FontAwesomeIcon icon={faMinus}/>
                    </button>
                    <input
                        type="text"
                        className="form-control"
                        value={count}
                        onChange={onChangeValue}
                    />
                    <button
                        className="btn btn-primary text-white"
                        type="button"
                        onClick={onCountUp}
                    >
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                </div>
            </td>
            <td>
                <var className="price">{item.price}</var>
                <small className="d-block text-muted">
                    {item.discountPrice}
                </small>
            </td>
            <td className="text-end">
                <button className="btn btn-sm btn-outline-secondary me-2">
                    <IconHeartFill className="i-va"/>
                </button>
                <button className="btn btn-sm btn-outline-danger" onClick={onClickDelete}>
                    <IconTrash className="i-va"/>
                </button>
            </td>
        </tr>
    )
}
export default CartProduct;