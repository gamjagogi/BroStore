import React, { useState } from 'react';
import {Login} from "../Styles/Loginform/Login.style";
import { useNavigate, useLocation } from 'react-router-dom';
import UserHeader from '../Navbar/UserHeader';


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();


    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // 로그인 성공 시 처리할 작업
                const data = await response.json();
                console.log(JSON.stringify(data)); // JSON 형태로 출력
                console.log(data.data.username)

                // 액세스 토큰과 리프레시 토큰을 localStorage에 저장
                localStorage.setItem('accessToken', response.headers.get('access-token'));
                localStorage.setItem('refreshToken', response.headers.get('refresh-token'));

                //gamja@gmail.com
                navigate('/', { state: data.data.username});

            } else {
                // 로그인 실패 시 처리할 작업
                setLoginError('로그인에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('로그인 요청 중 오류가 발생했습니다.', error);
            setLoginError('로그인 요청 중 오류가 발생했습니다.');

        }
    };

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
            {location.pathname !== '/' && location.state && (
                <UserHeader data={location.state} />
            )}
        </Login>
    );
}

export default LoginPage;
