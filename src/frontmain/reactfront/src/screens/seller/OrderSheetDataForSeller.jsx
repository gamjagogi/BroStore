import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {ReactComponent as IconHeartFill} from "bootstrap-icons/icons/heart-fill.svg";
import {ReactComponent as IconTrash} from "bootstrap-icons/icons/trash.svg";


const OrderSheetData = (props) => {

    const {order, handleDelete} = props;

    console.log("주문목록 진입");



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
                    {order.productName}
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
                        {order.customerEmail}
                    </small>
                    <small className="d-block text-muted">
                        Tel:{order.customerTel}
                    </small>
                </div>
            </td>
            <td>
                <div className="row">
                    <small className="d-block text-muted">
                        <var className="price">{order.productTotalPrice}원</var>
                        <var className="price">{order.count}개</var>
                    </small>
                </div>
            </td>
            <tb>
                <div className="row" style={{marginTop:"-10px"}}>
                    <small className="d-block text-muted">
                        {order.state?"배송 요청 중":"배송 취소 요청 중"}
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