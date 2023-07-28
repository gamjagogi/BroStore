import React, { useEffect, useRef, useState } from "react";
import {
    PaymentWidgetInstance,
    loadPaymentWidget,
    ANONYMOUS,
} from "@tosspayments/payment-widget-sdk";
import "../../App.css";
import axios from "../Request/RequestConfig";
import { useSearchParams } from "react-router-dom";
const selector = "#payment-widget";
const clientKey = "test_ck_Z0RnYX2w532mRnklB6P8NeyqApQE";
const customerKey = "@YbX2HuSlsC9uVJW6NMRMj"; // 회원가입시 생성되게끔 하자. user db에 항상 보관.

// 클라이언트 페이지.
export function CheckoutPage() {

    const [searchParams] = useSearchParams();
    const checkingOrderId = searchParams.get("or");

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
            const id = sessionStorage.getItem('userData2');
            const orderId = checkingOrderId;
            console.log(orderId);
            console.log(accessToken);
            console.log(refreshToken);

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

                    setOrderName(orderSheetData.data.orderName);
                    setCustomerName(orderSheetData.data.customerName);
                    setCustomerEmail(orderSheetData.data.customerEmail);
                    setPrice(orderSheetData.data.price);
                    setOrderId(orderSheetData.data.orderCode);

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
    };

    useEffect(() => {
        getOrderSheet();
        console.log(price,orderId,orderName,customerName,customerEmail);
    },[])

    useEffect(() => {
        console.log(price,orderId,orderName,customerName,customerEmail);
        (async () => {
            // ------  결제위젯 초기화 ------
            // 비회원 결제에는 customerKey 대신 ANONYMOUS를 사용하세요.
            const paymentWidget = await loadPaymentWidget(clientKey, customerKey); // 회원 결제
            // const paymentWidget = await loadPaymentWidget(clientKey, ANONYMOUS); // 비회원 결제

            // ------  결제위젯 렌더링 ------
            // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
            const paymentMethodsWidget = await paymentWidget.renderPaymentMethods(
                selector,
                { value: price }
            );

            // ------  이용약관 렌더링 ------
            // https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자
            paymentWidget.renderAgreement("#agreement");

            paymentWidgetRef.current = paymentWidget;
            paymentMethodsWidgetRef.current = paymentMethodsWidget;
        })();
    }, [getOrderSheet()]);

    useEffect(() => {
        const paymentMethodsWidget = paymentMethodsWidgetRef.current;

        if (paymentMethodsWidget == null) {
            return;
        }

        // ------ 금액 업데이트 ------
        // https://docs.tosspayments.com/reference/widget-sdk#updateamount결제-금액
        paymentMethodsWidget.updateAmount(
            price,
            paymentMethodsWidget.UPDATE_REASON.COUPON
        );
    }, [price]);

    return (
        <div>
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
                            orderId: orderId,
                            orderName: orderName,
                            customerName: customerName,
                            customerEmail: customerEmail,
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
