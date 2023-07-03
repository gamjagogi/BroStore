import React, { useState } from 'react';
import {Login} from "../Styles/Loginform/Login.style";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../Request/RequestConfig.js';


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();


    const handleLogin = async () => {
        try {
            const response = await axios.post('/login', JSON.stringify({ email, password }), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status == 200) {
                // 로그인 성공 시 처리할 작업
                const accessToken = response.headers.get('access-token');
                const refreshToken = response.headers.get('refresh-token');

                console.log(accessToken);

                const data = await response.data;
                console.log(JSON.stringify(data)); // JSON 형태로 String형태로 출력
                console.log(data.data.username);



                // 로그인 정보 저장
                sessionStorage.setItem('userData', JSON.stringify(data.data));

                // 액세스 토큰과 리프레시 토큰을 localStorage에 저장
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);

                //gamja@gmail.com
                navigate('/shop');

            } else {
                // 로그인 실패 시 처리할 작업
                setLoginError('로그인에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('로그인 요청 중 오류가 발생했습니다.', error);
            setLoginError('로그인 요청 중 오류가 발생했습니다.');
        }
    };

    const handleJoin = () => {
        navigate('/join')
    }


    return (
        <Login>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>로그인</button>
            <button onClick={handleJoin}>회원가입</button>
        </Login>
    );
}

export default LoginPage;
