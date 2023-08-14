import React, {useEffect, useState} from "react";
import {ReactComponent as IconTrash} from "bootstrap-icons/icons/trash.svg";
import {ReactComponent as IconTruck} from "bootstrap-icons/icons/truck.svg";
import {ReactComponent as IconBagXFill} from "bootstrap-icons/icons/bag-x-fill.svg";


const OrderSheetData = (props) => {

    const {order, handleCancelComplite,handleDeliveryComplite} = props;


    console.log("주문목록 진입");
    let status;
    console.log(order.status);
    if(order.status=="SHIPPING_IN_PROGRESS"){
        status = "배송 중";
    }else if(order.status=="CANCELLATION_PROCESSING"){
        status = "취소 요청";
    }else if(order.status=="DELIVERY_COMPLETED"){
        status = "배송 완료"
    }else if(order.status=="CANCELLATION_COMPLETED"){
        status = "취소 완료";
    }


    const onClickCancelComplite = async () => {
        handleCancelComplite(order.orderCode);
    }

    const onClickDeliveryComplite = async () => {
        handleDeliveryComplite(order.orderCode);
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
                        {status}
                    </small>
                </div>
            </tb>
            <td>
                {order.status=="DELIVERY_COMPLETED"|order.status=="CANCELLATION_COMPLETED"?
                    (<div className="row">
                    <button className="btn btn-sm btn-outline-danger" disabled
                            style={{width:"50px", marginRight:'5px'}} onClick={onClickCancelComplite}>
                        <IconBagXFill className="i-va"/>
                    </button>
                    <button className="btn btn-sm btn-outline-success" disabled
                            style={{width:"50px"}} onClick={onClickDeliveryComplite}>
                        <IconTruck className="i-va"/>
                    </button>
                </div>):
                    (<div className="row">
                        <button className="btn btn-sm btn-outline-danger"
                                style={{width:"50px", marginRight:'5px'}} onClick={onClickCancelComplite}>
                            <IconBagXFill className="i-va"/>
                        </button>
                        <button className="btn btn-sm btn-outline-success"
                                style={{width:"50px"}} onClick={onClickDeliveryComplite}>
                            <IconTruck className="i-va"/>
                        </button>
                    </div>)}
            </td>
        </tr>
    )
}
export default OrderSheetData;