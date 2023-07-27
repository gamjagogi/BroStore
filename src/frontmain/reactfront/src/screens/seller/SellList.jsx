import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {ReactComponent as IconHeartFill} from "bootstrap-icons/icons/heart-fill.svg";
import {ReactComponent as IconTrash} from "bootstrap-icons/icons/trash.svg";


const OrderSheetData = (props) => {

    const {order, handleDelete} = props;
    let status;
    console.log("주문목록 진입");

    console.log(order.state);
    if(order.state==true){
        status = "배송중";
    }else{
        status = "취소중";
    }


    const onClickDelete = async () => {
        handleDelete(order.orderCode);
    }

    return (
        <tr>
            <td>
                <div className="row">
                    <small className="d-block text-muted">
                        {order.orderCode}
                    </small>
                </div>
                <small className="d-block text-muted" style={{fontWeight: 'bold'}}>
                    {order.orderName}
                </small>
            </td>
            <td>
                <div className="row">
                    <small className="d-block text-muted">
                        {order.receiveAddress}
                    </small>
                </div>
            </td>
            <td>
                <div className="row">
                    <small className="d-block text-muted">
                        {order.userName}
                    </small>
                    <small className="d-block text-muted">
                        Tel:{order.tel}
                    </small>
                </div>
            </td>
            <td>
                <div className="row">
                    <small className="d-block text-muted">
                        <var className="price">{order.orderPrice}원</var>
                    </small>
                </div>
            </td>
            <tb>
                <div className="row" style={{marginTop:"-10px"}}>
                    <small className="d-block text-muted">
                        {status}
                    </small>
                </div>
            </tb>
            <td>
                <div className="row">
                    <button className="btn btn-sm btn-outline-danger"
                            style={{width:"50px"}} onClick={onClickDelete}>
                        <IconTrash className="i-va"/>
                    </button>
                </div>
            </td>
        </tr>
    )
}
export default OrderSheetData;