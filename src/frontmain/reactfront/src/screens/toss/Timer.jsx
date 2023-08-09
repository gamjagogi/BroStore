import React, {lazy, useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";


const Timer = () => {
    const FailPage = lazy(() => import("./FailPage"));
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId");
    const state = searchParams.get("state");

    useEffect(() => {
        const timer = setTimeout(() => {
            return FailPage(orderId);
        }, 5 * 60 * 1000);

        if(orderId && state=="ok"){
           clearTimeout(timer);
           return navigate('/orderSheet');
        }

        navigate(`/payments?or=${orderId}`);

    },[])


}

export default Timer;