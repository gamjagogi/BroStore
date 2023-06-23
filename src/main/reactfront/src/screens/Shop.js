import React, { useState, useEffect } from 'react';
import { Container } from "../components/Styles/Container/Container.style";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import axios from '../components/Request/axios.js';



const Shop = () => {
    const [loginError, setLoginError] = useState('');
    const [boardPG, setBoardPG] = useState({ content: [] });
    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        handlePage();
    }, [currentPage]);

    const handlePage = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');

            if (accessToken && refreshToken) {
                const response = await axios.get(`/auth/shop?page=${currentPage - 1}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'RefreshToken': `Bearer ${refreshToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setBoardPG(data.data);
                } else {
                    setLoginError('인증된 유저만 접근 가능합니다.');
                }
            } else {
                setLoginError('로그인이 필요합니다.');
            }
        } catch (error) {
            console.error('인증되지 않은 사용자가 접근하려 합니다..', error);
            setLoginError('인증된 유저만 접근 가능합니다.');
        }
    };

    const handlePosting = () => {
        navigate('/editor');
    }

    const handleNextPage = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    }

    const handleBackPage = () => {
        setCurrentPage((currentPage) => currentPage - 1);
    }

    return (
        <Container>
            <header>
                <h1> ShopPage </h1>
            </header>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <form action="/" method="get">
                    <input type="text" placeholder="Search" name="keyword" />
                    <button style={{ marginLeft: '0.5em' }}>Search</button>
                </form>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5em' }}>
                <form action="/" method="get">
                    <button onClick={handlePosting} style={{ marginLeft: '0.5em' }}>글작성</button>
                </form>
            </div>

            <ListGroup as="ol" numbered={true}>

                {boardPG.content.map((board) => (
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" key={board.id}>
                        <div className="ms-2 me-auto">
                            <h4 className="fw-bold">{board.title}</h4>
                            <a href={`/detail/${board.id}`}>상세보기</a>
                        </div>
                        <div>
                            <div>작성자 : {board.user.username}</div>
                        </div>
                        <hr />
                        {console.log(board.thumbnail)}
                        <Image src={board.thumbnail} style={{ height: "100px" }} fluid />
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <div>현재 페이지: {currentPage}</div>

            <Pagination>
                <Pagination.First onClick={() => setCurrentPage(1)} />
                <Pagination.Prev onClick={handleBackPage} disabled={currentPage === 1} />
                {Array.from({ length: boardPG.totalPages }, (_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={handleNextPage} disabled={boardPG.last} />
                <Pagination.Last onClick={() => setCurrentPage(boardPG.totalPages)} />
            </Pagination>
        </Container>
    );
}

export default Shop;
