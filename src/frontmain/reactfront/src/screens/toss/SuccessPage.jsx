import { useSearchParams } from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "../Request/RequestConfig";

export function SuccessPage() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const secretKey = 'test_sk_7XZYkKL4MrjAX4ly9JAV0zJwlEWR';
    const encoder = new TextEncoder();
    const data = encoder.encode(`${secretKey}:`);
    const basicToken = btoa(String.fromCharCode(...data));

    //const basicToken = Buffer.from(`${secretKey}:`,"utf-8").toString("base64");
    const paymentKey = searchParams.get("paymentKey");
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");

    console.log(searchParams.get("paymentKey"));
    console.log(basicToken);
    // 토스에 결제 승인 요청을 보낸다. 토스 결제승인요청url: https://api.tosspayments.com/v1/payments/confirm
    // basicToken을 만든다. 시크릿키: base64로 인코딩
    // headers: Authorization: `Basic #{basicToken}`, 을 넣어서 토스에 post요청을 보낸다.
    // post요청시 orderId도 같이 보내도록한다. url에 쿼리스트링으로 전달하자.
    const DeleteCart = async () => {

        try {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            const id = sessionStorage.getItem("userData2");

            if (accessToken && refreshToken) {
                const response = await axios.get(`/auth/cart/delete/${id}`,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'RefreshToken': `Bearer ${refreshToken}`,
                    },
                });

                if (response.status == 200) {
                    console.log('결제 성공, 장바구니 삭제 완료')
                    navigate("/")
                }
            } else {
                console.error('인증되지 않은 사용자가 접근하려 합니다.');
                throw new Error('인증되지 않은 사용자가 접근하려 합니다.');
            }
        } catch (error) {
            console.error('에러발생..', error);
            alert('결제 실패 및 에러발생, 잠시 후 다시 진행해 주세요.');
        }
    }

    const RequestOrderSheet = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            const id = sessionStorage.getItem('userData2');
            console.log(accessToken);
            console.log(refreshToken);
            console.log(orderId);

            if (accessToken && refreshToken) {
                const response = await axios.get(`/auth/user/${id}/order/${orderId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'RefreshToken': `Bearer ${refreshToken}`,
                    },
                });

                if (response.status == 200) {
                    const orderSheetData = await response.data;
                    console.log(orderSheetData);

                    if(orderSheetData.data.orderCode==orderId){
                        requestApproval();
                    }else {
                        console.error('DB 내, 주문번호가 일차하는 주문번호가 아닙니다.');
                    }

                } else {
                    console.error('결제내역을 가져오는대 실패하였습니다.');
                }
            } else {
                console.error('인증되지않은 유저는 접근할 수 없습니다.'); // 토큰 인증 실패
            }
        } catch (error) {
            console.error('에러 발생.', error);
            alert('잠시 후 다시 결제를 진행해 주세요.');
        }
    }


    useEffect( () => {
       RequestOrderSheet();
    }, []);





    const requestApproval = async () => {
        try{
            const response = await fetch('https://api.tosspayments.com/v1/payments/confirm',{
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${basicToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: amount,
                    orderId: orderId,
                    paymentKey: paymentKey
            })
            });
            if(response.status==200){
                console.log('성공');
                console.log(response);
                DeleteCart();
            }else {
                console.log('실패');
                console.log(response);
                alert('결제 승인 실패.');
                navigate('/');
            }

        }catch (error){
            alert(error);
        }
    }

    return (
        <div>
            <h1>결제 성공</h1>
            <div>{`주문 아이디: ${searchParams.get("orderId")}`}</div>
            <div>{`결제 금액: ${Number(
                searchParams.get("amount")
            ).toLocaleString()}원`}</div>
        </div>
    );
}