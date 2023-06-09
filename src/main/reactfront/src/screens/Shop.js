import React, { useState, useEffect } from 'react';
import { Container } from "../components/Styles/Container/Container.style";
import { Header, MainHeader } from "../components/Styles/Header/Header.style";
import { useLocation, useNavigate } from "react-router-dom";

const Shop = () => {
    const [loginError, setLoginError] = useState('');
    const [boardPG, setBoardPG] = useState({ content: [] });

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        handlePage();
    }, []);

    const handlePage = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            console.log(accessToken);
            console.log(refreshToken);

            if (accessToken && refreshToken) {
                const response = await fetch('http://localhost:3001/auth/shop', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'RefreshToken': `Bearer ${refreshToken}`,
                    }
                });

                console.log(response);

                if (response.ok) {
                    // 로그인 성공 시 처리할 작업
                    const data = await response.json();
                    console.log(JSON.stringify(data)); // JSON 형태로 출력
                    setBoardPG(data.data.boardPG);
                } else {
                    // 로그인 실패 시 처리할 작업
                    setLoginError('인증된 유저만 접근 가능합니다.');
                }
            } else {
                setLoginError('로그인이 필요합니다.'); // 로그인되지 않은 경우 처리
            }
        } catch (error) {
            console.error('인증되지 않은 사용자가 접근하려 합니다..', error);
            setLoginError('인증된 유저만 접근 가능합니다.');
        }
    };

    return (
        <Container className="container my-3">
            <header>
                <h1> ShopPage </h1>
            </header>
            <div className="d-flex justify-content-end">
                <form className="d-flex col-lg-3" action="/" method="get">
                    <input className="form-control" type="text" placeholder="Search" name="keyword" />
                    <button className="btn btn-primary">Search</button>
                </form>
            </div>
            <div className="my-board-box row">
                {/* 글 아이템 시작 */}
                {boardPG.content.map((board) => (
                    <div className="card col-lg-3 pt-2">
                        <img className="card-img-top" style={{ height: "250px" }} src={board.thumbnail} />
                        <hr />
                        <div className="card-body">
                            <div>작성자 : {board.user.username}</div>
                            <h4 className="card-title my-text-ellipsis">{board.title}</h4>
                            <a href={`/board/${board.id}`} className="btn btn-primary">상세보기</a>
                        </div>
                    </div>
                ))}
                {/* 글 아이템 끝 */}
            </div>

            <ul className="pagination mt-3 d-flex justify-content-center">
                <li className={`page-item ${boardPG.first ? "disabled" : ""}`}>
                    <a className="page-link" href={`/?page=${boardPG.number - 1}`}>Previous</a>
                </li>
                <li className={`page-item ${boardPG.last ? "disabled" : ""}`}>
                    <a className="page-link" href={`/?page=${boardPG.number + 1}`}>Next</a>
                </li>
            </ul>
        </Container>
    );
};

export default Shop;
