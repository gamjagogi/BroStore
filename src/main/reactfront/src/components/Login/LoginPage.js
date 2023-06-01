import React, { useState } from 'react';
import {Login} from "../Styles/Loginform/Login.style";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // 로그인 처리 로직을 작성하세요
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <Login>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email" //타입을 이메일로해두어, 유효성이 자동으로 처리된다.
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button type="submit">Login</button>
            </form>
        </Login>
    );
};

export default LoginPage;
