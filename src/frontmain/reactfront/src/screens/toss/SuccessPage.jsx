import { useSearchParams } from "react-router-dom";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

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


    useEffect(() => {
        requestApproval();
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
                navigate('/cart');

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