import React, {useState, useEffect } from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {useNavigate, useLocation } from 'react-router-dom';




const UserHeader = ( {data} ) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();
    const location = useLocation();


    // 로그인 상태 변경 함수
    const handleLogin = () => {
        navigate('/login');
    };

    // 로그아웃 상태 변경 함수
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserName('');
    };

    useEffect(() => {
        if (location.state) {
            setIsLoggedIn(true);
            setUserName(location.state);
        }
    }, [location.state]);

    // useEffect(() => {
    //     // 컴포넌트가 마운트될 때 실행되며, location 객체를 사용하여 필요한 작업을 수행할 수 있습니다.
    //     console.log(location.pathname); // 현재 경로
    //     console.log(location.state); // 전달된 상태 데이터
    // }, [location]);




    return (<header>
        {isLoggedIn ? (<Card style={{width: '300px', height: '100px'}}>
            <Card.Header style={{fontSize: '16px', padding: '2px'}}>회원</Card.Header>
            <Card.Body style={{fontSize: '14px', padding: '2px'}}>
                <Card.Title style={{fontSize: '18px', marginBottom: '8px'}}>안녕하세요, { userName }님 </Card.Title>
                <Button variant="primary" size="sm" onClick={handleLogout}> 로그아웃 </Button>
                <Button variant="primary" size="sm" style={{marginLeft: '30px'}}> 회원 정보 수정 </Button>
            </Card.Body>
        </Card>) : (<Card>
            <Button onClick={handleLogin}>로그인</Button>
        </Card>)}
    </header>);
};

export default UserHeader;
