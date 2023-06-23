import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const JoinPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [birth, setBirth] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [domain, setDomain] = useState('http://13.124.84.124:9999');


    useEffect(() => {
        // 비밀번호 일치 여부 확인
        setPasswordMismatch(password !== confirmPassword);
    }, [password, confirmPassword]);

    const handleJoin = async (e) => {
        e.preventDefault();

        // 이메일 형식 확인
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            // 이메일 형식이 올바르지 않음
            return;
        }

        // 비밀번호 일치 여부 확인
        if (password !== confirmPassword) {
            // 비밀번호 불일치
            return;
        }

        // 이름이 한글인지 확인
        const nameRegex = /^[가-힣]+$/;
        if (!nameRegex.test(username)) {
            // 이름이 한글이 아님
            return;
        }

        try {
            const response = await fetch(`${domain}/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, username, birth }),
            });

            if (response.ok) {
                navigate('/login');
            } else {
                // 실패 처리 로직
            }
        } catch (error) {
            // 오류 처리 로직
        }
    };

    return (
        <div>
            <h1>회원가입</h1>
            <Form onSubmit={handleJoin}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email 주소</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicConfirmPassword">
                    <Form.Label>비밀번호 확인</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {passwordMismatch && (
                        <Alert variant="danger">
                            비밀번호와 확인 비밀번호가 일치하지 않습니다.
                        </Alert>
                    )}
                </Form.Group>

                <Form.Group controlId="formBasicName">
                    <Form.Label>이름</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="이름"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicBirth">
                    <Form.Label>생년월일</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="생년월일"
                        value={birth}
                        onChange={(e) => setBirth(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    회원가입
                </Button>
            </Form>
        </div>
    );
};

export default JoinPage;
