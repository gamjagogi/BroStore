import React, { useEffect, useRef, useState } from "react";
import { loadTossPayments } from '@tosspayments/payment-sdk'

import "../../App.css";
import axios from "../Request/RequestConfig";

const selector = "#payment-widget";
const clientKey = "test_ck_Z0RnYX2w532mRnklB6P8NeyqApQE";
const customerKey = "@YbX2HuSlsC9uVJW6NMRMj"; // 회원가입시 생성되게끔 하자. user db에 항상 보관.

// 클라이언트 페이지.
export function CheckoutPage() {
    const paymentWidgetRef = useRef(null);
    const paymentMethodsWidgetRef = useRef(null);
    const [price, setPrice] = useState(0);
    const [orderId, setOrderId ] = useState('');
    const [orderName, setOrderName] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');


    const getOrderSheet = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            const id = sessionStorage.getItem('userData2')
            console.log(accessToken);
            console.log(refreshToken);

            if (accessToken && refreshToken) {
                const response = await axios.get(`/auth/order/user/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'RefreshToken': `Bearer ${refreshToken}`,
                    },
                });

                if (response.status == 200) {
                    const orderSheetData = await response.data;
                    console.log(orderSheetData);
                    setOrderId(orderSheetData.data.orderId);
                    setOrderName(orderSheetData.data.orderName);
                    setCustomerName(orderSheetData.data.customerName);
                    setCustomerEmail(orderSheetData.data.customerEmail);
                    setPrice(orderSheetData.data.price);

                } else {
                    console.error('게시글을 가져오는데 실패했습니다.');
                }
            } else {
                console.error('인증되지않은 유저는 접근할 수 없습니다.'); // 토큰 인증 실패
            }
        } catch (error) {
            console.error('에러 발생.', error);
            alert('잠시 후 다시 결제를 진행해 주세요.');
        }
    };

    useEffect(() => {
        getOrderSheet();
    },[])

    useEffect(() => {
        // ------ 클라이언트 키로 객체 초기화 ------
        loadTossPayments(clientKey).then(tossPayments => {
            // ------ 결제창 띄우기 ------
            tossPayments.requestPayment('카드', { // 결제수단 파라미터
                // 결제 정보 파라미터
                // 더 많은 결제 정보 파라미터는 결제창 Javascript SDK에서 확인하세요.
                // https://docs.tosspayments.com/reference/js-sdk
                amount: 100, // 결제 금액
                orderId: 'etkIslSuKldH08zfYQQs0', // 주문 ID
                orderName: '테스트 결제', // 주문명
                customerName: '김토스', // 구매자 이름
                successUrl: 'https://docs.tosspayments.com/guides/payment/test-success', // 결제 성공 시 이동할 페이지(이 주소는 예시입니다. 상점에서 직접 만들어주세요.)
                failUrl: 'https://docs.tosspayments.com/guides/payment/test-fail', // 결제 실패 시 이동할 페이지(이 주소는 예시입니다. 상점에서 직접 만들어주세요.)
            })
                // ------ 결제창을 띄울 수 없는 에러 처리 ------
                // 메서드 실행에 실패해서 reject 된 에러를 처리하는 블록입니다.
                // 결제창에서 발생할 수 있는 에러를 확인하세요.
                // https://docs.tosspayments.com/reference/error-codes#결제창공통-sdk-에러
                .catch(function (error) {
                    if (error.code === 'USER_CANCEL') {
                        // 결제 고객이 결제창을 닫았을 때 에러 처리
                    } else if (error.code === 'INVALID_CARD_COMPANY') {
                        // 유효하지 않은 카드 코드에 대한 에러 처리
                    }
                });
        });
    }, [orderId]);


    return (
        <div>
            <script src="https://js.tosspayments.com/v1/payment"></script>
            <h1>주문서</h1>
            <span>{`${price.toLocaleString()}원`}</span>
            <div>
                <label>
                    <input
                        type="checkbox"
                        onChange={(event) => {
                            setPrice(event.target.checked ? price - 100 : price + 100);
                        }}
                    />
                    1,00원 할인 쿠폰 적용
                </label>
            </div>
            <div id="payment-widget" />
            <div id="agreement" />
            <button
                onClick={async () => {
                    const paymentWidget = paymentWidgetRef.current;

                    try {
                        // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
                        // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
                        await paymentWidget?.requestPayment({
                            orderId: {orderId},
                            orderName: {orderName},
                            customerName: {customerName},
                            customerEmail: {customerEmail},
                            successUrl: `${window.location.origin}/success`,
                            failUrl: `${window.location.origin}/fail`,
                        });
                    } catch (error) {
                        // 에러 처리하기
                        console.error(error);
                    }
                }}
            >
                결제하기
            </button>
        </div>
    );
}
