import React, {useEffect, useState} from 'react';
import {Login} from "../../components/Styles/Loginform/Login.style";
import {useNavigate, useLocation} from 'react-router-dom';
import axios from '../Request/RequestConfig.js';
import {ReactComponent as IconKakaoLogo} from '../../assets/kakaologo.svg'
import {Button, Card, Container} from "react-bootstrap";


const LoginPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const code = new URL(window.location.href).searchParams.get("code");

    const buttonStyle = {
        width: '90px',
        height: '40px',
        fontSize: '14px',
        marginRight: '3px'
        // Add more styles here as needed
    };

    useEffect(() => {
        return console.log(code);
    }, [code]);


    const navigate = useNavigate();
    const location = useLocation();

    const SocialKakao = () => {
        const Rest_api_key = 'c4ea7b717441096606e933d562d8f8a6' //REST API KEY
        const redirect_uri = 'http://localhost:3000/auth' //Redirect URI
        // oauth 요청 URL
        const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code&scope=account_email`
        const handleLogin = () => {
            window.location.href = kakaoURL
        }
        return (
            <Button onClick={handleLogin} style={buttonStyle}> {/* 여기에 버튼 스타일을 적용 */}
                <span className="kakao-icon">
                    <IconKakaoLogo style={{ width: '30px', height: '30px' }}/>
                    login
                </span>
            </Button>
        )
    }


    const handleLogin = async () => {
        try {
            const response = await axios.post('/login', JSON.stringify({email, password}), {
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
                console.log(data.data.userId);
                console.log(data.data.userRole);


                // 로그인 정보 저장
                sessionStorage.setItem('userData', JSON.stringify(data.data.username));
                sessionStorage.setItem('userData2', JSON.stringify(data.data.userId));
                sessionStorage.setItem('userRole', JSON.stringify(data.data.userRole));

                // 액세스 토큰과 리프레시 토큰을 localStorage에 저장
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                setIsLoggedIn(true);
                //gamja@gmail.com
                navigate('/');
                window.location.reload();
            } else {
                // 로그인 실패 시 처리할 작업
                setLoginError('로그인에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('로그인 요청 중 오류가 발생했습니다.', error);
            setLoginError('로그인 요청 중 오류가 발생했습니다.');
            alert('유효한 계정이 아닙니다.');
        }
    };

    const handleJoin = () => {
        navigate('/join')
    }


    return (
        <div className='container-fluid align-items-center'>
            <Card border="primary" style={{margin:'30px'}}>
                <h1 style={{fontSize:'50px'}}>로그인</h1>
                <Login className="d-grid gap-2">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        maxLength={50}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        maxLength={40}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                </Login>
                <div className="ui-button" style={{marginBottom:'30px'}}>
                    <Button onClick={handleLogin} style={buttonStyle}>로그인</Button>
                    <SocialKakao/>
                    <Button onClick={handleJoin} style={buttonStyle}>회원가입</Button>
                </div>
            </Card>
        </div>
    );
}

export default LoginPage;
