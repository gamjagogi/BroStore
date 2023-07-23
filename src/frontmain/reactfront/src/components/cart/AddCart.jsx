import axios from "../../screens/Request/RequestConfig";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";


const AddCart = (props) => {

    const { itemId, count } = props;
    const navigate = useNavigate();

    console.log('카트진입');

    useEffect(() => {
        addCartItem();
    }, []);


    const addCartItem = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            console.log(accessToken);
            console.log(refreshToken);


            const requestData = {count};


            if (accessToken && refreshToken) {
                // 요청 보내기
                console.log(requestData);
                const response = await axios.post(`/auth/cart/save/${itemId}`, JSON.stringify(requestData), {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'RefreshToken': `Bearer ${refreshToken}`,
                    },
                });

                if (response.status == 200) {
                    // 응답 성공 시 처리할 작업
                    const data = await response.data;
                    console.log(data); // 요청에 대한 응답 처리
                    alert('장바구니 담기 성공');
                    navigate(`/delivery/${itemId}`);

                } else {
                    // 응답 실패 시 처리할 작업
                    const errorMessages = await response.data;
                    console.log(errorMessages.errors);
                    const errors = errorMessages.errors;
                    for (const error of errors) {
                        console.log(error.defaultMessage);
                        alert(error.defaultMessage);
                    }
                }
            } else {
                alert('에러발생');
            }
        } catch (error) {
            console.error('인증되지 않은 사용자가 접근하려 합니다..', error);
        }
    }
}

export default AddCart;
