import React, {useState, useEffect } from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {useNavigate, useLocation } from 'react-router-dom';
import axios from "../Request/RequestConfig";




const UserHeader = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const userDataString = sessionStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;

    const navigate = useNavigate();

    // 로그인 상태 변경 함수
    const handleLogin = () => {
        navigate('/login');
    };

    // 로그아웃 상태 변경 함수
    const handleLogout = async () => {
        const id = sessionStorage.getItem('userData2');
        try {
            const response = await axios.post(`/auth/logout/${id}`);
            if (response.status === 200) {
                console.log('로그아웃 성공');
                // 로그아웃 후 원하는 동작을 수행하거나 홈 화면 등으로 이동할 수 있습니다.
                setIsLoggedIn(false);
                setUserName('');
                sessionStorage.removeItem('userData');
                sessionStorage.removeItem('userData2');
                sessionStorage.removeItem('userRole');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('kakaoAccessToken');
                localStorage.removeItem('kakaoRefreshToken');
                alert('로그아웃 성공')
                window.location.reload();
            }
        } catch (error) {
            console.error('로그아웃 에러', error);
        }
    };

    const handleJoin = () => {
        navigate('/join')
    }

    useEffect(() => {
        if (userData) {
            setIsLoggedIn(true);
            console.log(userDataString);
            setUserName(userDataString);

        }
    }, [userData]);





    return (<header>
        {isLoggedIn ? (<Card style={{width: '300px', height: '100px'}}>
            <Card.Header style={{fontSize: '16px', padding: '2px'}}>회원</Card.Header>
            <Card.Body style={{fontSize: '14px', padding: '2px'}}>
                <Card.Title style={{fontSize: '18px', marginBottom: '8px'}}>안녕하세요, { userName }님 </Card.Title>
                <Button variant="primary" size="sm" onClick={handleLogout}> 로그아웃 </Button>
                <Button variant="primary" size="sm" style={{marginLeft: '30px'}}> 회원 정보 수정 </Button>
            </Card.Body>
        </Card>) : (<Card style={{width: '290px', height: '90px'}}>
            <div className="d-grid gap-2">
            <Button onClick={handleLogin}>로그인</Button>
            <Button onClick={handleJoin}>회원가입</Button>
            </div>
        </Card>)}
    </header>);
};

export default UserHeader;
