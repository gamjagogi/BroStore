import React, {lazy, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import OrderSheetDataForSeller from "./OrderSheetDataForSeller";
import { ReactComponent as IconChevronRight } from "bootstrap-icons/icons/chevron-right.svg";
import { ReactComponent as IconChevronLeft } from "bootstrap-icons/icons/chevron-left.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import axios from "../Request/RequestConfig";
import {useNavigate} from "react-router-dom";


const OrderSheetForSeller = () => {
    const navigate = useNavigate();
    const [orderList, setOrderList ] = useState([]);

    useEffect(()=>{
        onOrderSheetPage();
    },[])


    const onOrderSheetPage = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            const id = sessionStorage.getItem('userData2'); // 현재 로그인중인 userId
            console.log(id);

            if (accessToken && refreshToken) {
                const response = await axios.get(`/manager/progressOrders/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'RefreshToken': `Bearer ${refreshToken}`,
                    },
                });

                if (response.status == 200) {
                    const data = await response.data.data;
                    console.log(data);

                    setOrderList(data);

                } else {
                    console.error('판매상품이 존재하지않습니다..');
                }
            } else {
                console.error('인증되지 않은 사용자가 접근하려 합니다.');
            }
        } catch (error) {
            console.error('에러발생..', error);
        }
    };

    const handleDelete = async (props) => {
        const orderId = props;
        console.log(orderId);

        try {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            const id = sessionStorage.getItem('userData2');

            if (accessToken && refreshToken) {
                const response = await axios.post(`/auth/order/delete/${id}`,JSON.stringify(orderId) ,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'RefreshToken': `Bearer ${refreshToken}`,
                    },
                });

                if (response.status == 200) {
                    console.log('주문목록 삭제 완료')
                    console.log(response.data);
                    alert('상품이 취소처리 될 예정입니다.');
                    window.location.reload();
                }
            } else {
                console.error('인증되지 않은 사용자가 접근하려 합니다.');
                throw new Error('인증되지 않은 사용자가 접근하려 합니다.');
            }
        } catch (error) {
            console.error('에러발생..', error);
            alert('에러발생, 잠시 후 다시 진행해 주세요.');
            navigate('/');
        }
    }

    return (
        <React.Fragment>
            <div className="bg-secondary border-top p-4 text-white mb-3">
                <h1 className="display-6 text-center">OrderSheet</h1>
            </div>
            <div className="container mb-3">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="table-responsive" >
                                <table className="table table-borderless">
                                    <thead className="text-muted">
                                    <tr className="small text-uppercase">
                                        <th scope="col" width={120}>Product</th>
                                        <th scope="col">Address</th>
                                        <th scope="col" width={120}>
                                            user
                                        </th>
                                        <th scope="col" width={150}>
                                            Price
                                        </th>
                                        <th scope="col" width={130}>state</th>
                                        <th scope="col" width={130} ></th>
                                    </tr>
                                    </thead>
                                    {orderList.map((order, idx) => {
                                        return (
                                            <tbody key={idx}>
                                            <OrderSheetDataForSeller
                                                order={order}
                                                handleDelete={handleDelete}
                                            />
                                            </tbody>
                                        )
                                    })}
                                </table>
                            </div>
                            <div className="card-footer">
                                <Link to="/" className="btn btn-secondary">
                                    <IconChevronLeft className="i-va" /> Continue shopping
                                </Link>
                            </div>
                        </div>
                        <div className="alert alert-success mt-3">
                            <p className="m-0">
                                <IconTruck className="i-va me-2" /> Free Delivery within 1-2
                                weeks
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default OrderSheetForSeller;