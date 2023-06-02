import React, {useState} from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";


const UserHeader = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');


    // 로그인 상태 변경 함수
    const handleLogin = () => {
        setIsLoggedIn(true);
        setUserName('John'); // 예시로 'John'을 유저 이름으로 설정합니다.
    };

    // 로그아웃 상태 변경 함수
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserName('');
    };

    return (
        <header>
            {isLoggedIn ? (
        <Card style={{width: '300px', height: '100px'}}>
            <Card.Header style={{fontSize: '16px', padding: '2px'}}>회원</Card.Header>
            <Card.Body style={{fontSize: '14px', padding: '2px'}}>
                <Card.Title style={{fontSize: '18px', marginBottom: '8px'}}>안녕하세요, {userName}님 </Card.Title>
                <Button variant="primary" size="sm" onClick={handleLogout}> 로그아웃 </Button>
                <Button variant="primary" size="sm" style={{marginLeft: '30px'}}> 회원 정보 수정 </Button>
            </Card.Body>
        </Card>
                ):(
                <button onClick={handleLogin}>로그인</button>
            )}
        </header>
    );
};

export default UserHeader;
