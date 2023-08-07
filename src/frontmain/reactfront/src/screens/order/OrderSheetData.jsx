import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {ReactComponent as IconHeartFill} from "bootstrap-icons/icons/heart-fill.svg";
import {ReactComponent as IconTrash} from "bootstrap-icons/icons/trash.svg";


const OrderSheetData = (props) => {

    const {order, handleDelete,handlePayments} = props;
    let status;
    console.log("주문목록 진입");

    // console.log(order.state);
    // if(order.state==true){
    //     status = "배송중";
    // }else{
    //     status = "취소중";
    // }
    console.log(order.status);
    if(order.status=="SHIPPING_IN_PROGRESS"){
        status = "배송 중";
    }else if(order.status=="WAITE_PAYMENT") {
        status = "결제 대기중";
    }else if(order.status=="CANCELLATION_PROCESSING"){
        status = "취소 처리 중";
    }else if(order.status=="DELIVERY_COMPLETED"){
        status = "배송 완료"
    }else if(order.status=="CANCELLATION_COMPLETED"){
        status = "취소 완료"
    }



    const onClickDelete = async () => {
        // 확인 문구
        const shouldDelete = window.confirm('정말로 취소하시겠습니까?');

        if (!shouldDelete) {
            return; // 사용자가 "취소"를 선택한 경우 아무 작업도 하지 않고 종료
        }

        handleDelete(order.orderCode);
    }

    const onClickPayments = async () => {
        handlePayments(order.orderCode);
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
                    {status=="배송 중"?(<button className="btn btn-sm btn-outline-danger"
                            style={{width:"50px"}} onClick={onClickDelete}>
                        <IconTrash className="i-va"/>
                    </button>):status=="결제 대기중"?
                        (<button className="btn btn-sm btn-outline-danger" style={{width:"50px"}} onClick={onClickPayments}>
                        <IconTrash className="i-va"/>
                    </button>):""}
                </div>
            </td>
        </tr>
    )
}
export default OrderSheetData;