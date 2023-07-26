import { useSearchParams } from "react-router-dom";
import React, {useEffect} from "react";
import axios from "../Request/RequestConfig";
import {useNavigate} from "react-router-dom";

export function FailPage() {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId");
    const navigate = useNavigate();

    useEffect(() => {
        deleteOrderSheet();
    }, []);


    const deleteOrderSheet = async () => {

        try {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            const id = sessionStorage.getItem('userData2');
            console.log(orderId);

            if (accessToken && refreshToken) {
                const response = await axios.post(`/auth/order/delete/${id}`,JSON.stringify(orderId) ,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'RefreshToken': `Bearer ${refreshToken}`,
                    },
                });

                if (response.status == 200) {
                    console.log('결제 실패, 주문목록 삭제 완료')
                    console.log(response.data);
                    navigate("/");
                }
            } else {
                console.error('인증되지 않은 사용자가 접근하려 합니다.');
                throw new Error('인증되지 않은 사용자가 접근하려 합니다.');
            }
        } catch (error) {
            console.error('에러발생..', error);
            alert('결제 실패 및 에러발생, 잠시 후 다시 진행해 주세요.');
            navigate('/cart');
        }
    }


    return (
        <div>
            <h1>결제 실패</h1>
            <div>{`사유: ${searchParams.get("message")}`}</div>
        </div>
    );
}