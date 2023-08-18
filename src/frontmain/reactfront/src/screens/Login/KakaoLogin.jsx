import React, {useEffect, useState} from "react"
import axios from "../Request/RequestConfig";
import {useNavigate} from "react-router-dom";
import './KakaoLogo.css';


const KakaoLogin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const code = new URL(window.location.href).searchParams.get("code");
    const [loginError,setLoginError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log(code);
        requestAuthorize(code);
        return;
    }, [code]);


    const requestAuthorize = async (props) => {

        const code = props;
        console.log(code);
        try {
            const response = await axios.post('/login/kakao', JSON.stringify(code), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status == 200) {
                // 로그인 성공 시 처리할 작업
                const accessToken = response.headers.get('access-token');
                const refreshToken = response.headers.get('refresh-token');
                const kakaoAccessToken = response.headers.get('kakao-access-token');
                const kakaoRefreshToken = response.headers.get('kakao-refresh-token');

                console.log(accessToken);

                const data = await response.data;
                console.log(JSON.stringify(data)); // JSON 형태로 String형태로 출력
                console.log(data.data.username);
                console.log(data.data.userId);
                console.log(data.data.userRole);


                // 로그인 정보 저장
                sessionStorage.setItem('userData', JSON.stringify(data.data.username));
                sessionStorage.setItem('userData2', JSON.stringify(data.data.userId));
                sessionStorage.setItem('userRole', JSON.stringify(data.data.userRole));

                // 액세스 토큰과 리프레시 토큰을 localStorage에 저장
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('kakaoAccessToken', kakaoAccessToken);
                localStorage.setItem('kakaoRefreshToken', kakaoRefreshToken);
                console.log('토큰저장완료, 이제 홈으로');
                setIsLoggedIn(true);
                navigate('/');
            } else {
                // 로그인 실패 시 처리할 작업
                setLoginError('로그인에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('로그인 요청 중 오류가 발생했습니다.', error);
            setLoginError('로그인 요청 중 오류가 발생했습니다.');
        }
    };

    return(
        <div className="bg-info bg-gradient p-3 text-center mb-3">
            <h4 className="m-0">로그인 중..</h4>
        </div>

    )
}
export default KakaoLogin;