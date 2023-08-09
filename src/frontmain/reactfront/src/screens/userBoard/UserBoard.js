import React, {useState, useEffect} from 'react';
import {Container} from "../../components/Styles/Container/Container.style";
import {useLocation, useNavigate} from "react-router-dom";

import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import axios from '../Request/RequestConfig.js';
import Paging from "../../components/Paging";



const UserBoard = () => {
    const [loginError, setLoginError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [currentProducts, setCurrentProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(null);
    const [totalItems, setTotalItems] = useState(0);
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();


    const commentRowStyle = {
        wordWrap: 'break-word', // 긴 텍스트를 자동으로 줄바꿈
        whiteSpace: 'pre-wrap', // 줄바꿈과 공백을 유지하도록 설정
    };




    useEffect(() => {
        handlePage().then((products) => {
            console.log(products.length);
            const offset = (currentPage - 1) * 9;
            const currentProducts = products.slice(offset, offset + 9);
            setCurrentProducts(currentProducts);
            setTotalItems(products.length);
        })
            .catch((error) => {
                console.error('Error occurred while fetching products:', error);
            })
        return;
    }, []);





    const onPageChanged = (page) => {
        handlePage().then((products) => {
            const {currentPage, totalPages, pageLimit} = page;
            const offset = (currentPage - 1) * pageLimit;
            const currentProducts = products.slice(offset, offset + pageLimit);

            setCurrentPage(currentPage);
            setCurrentProducts(currentProducts);
            setTotalPages(totalPages);
        })
            .catch((error) => {
                console.error("Error occurred while fetching products:", error);
            });
    };

    const handlePage = async () => {
        try {
                const response = await axios.get(`/board`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status == 200) {
                    const data = await response.data.data;
                    console.log(data);
                    return data;
                } else {
                    console.error('게시글을 가져오지 못했습니다.');
                }
        } catch (error) {
            console.error('에러발생..', error);
        }
    };

    const handlePosting = () => {
        const userId = sessionStorage.getItem('userData2');
        if(!userId){
            alert('로그인이 필요합니다.');
            return window.location.reload();
        }
        navigate('/editor');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`/board/search?keyword=${keyword}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status == 200) {
                const data = await response.data.data;
                console.log(data);
                setCurrentProducts(data); // 검색 결과를 현재 페이지 데이터로 설정
                setTotalItems(data.length); // 총 아이템 개수 설정 (페이징 처리를 위해)

            } else {
                console.error('게시글을 가져오지 못했습니다.');
            }
        } catch (error) {
            console.error('에러발생..', error);
        }
    };


    const onSearching = (props) => {
        const value = props.target.value;
        console.log(value);
        setKeyword(value);
    }
    return (
        <Container fluid style={commentRowStyle}>
            <header style={{marginTop:'30px'}}>
                <h1 style={{fontSize:'80px'}}> 유저게시판 </h1>
            </header>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <input type="text" placeholder="Search" name="search" onChange={onSearching}/>
                <button onClick={handleSubmit} style={{marginLeft: '0.5em'}}>Search</button>
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '0.5em'}}>
                    <button onClick={handlePosting} style={{marginLeft: '0.5em'}}>글작성</button>
            </div>

            <ListGroup as="ol" numbered={true} style={{margin:'20px'}}>
                {currentProducts.map((board) => (
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start"style={{minHeight:'130px'}} key={board.id}>
                        <div className="ms-3 me-auto col-4">
                            <h4 className="fw-bold">{board.title}</h4>

                        </div>
                        <div className="col-4"> <a style={{fontSize:'25px'}} href={`/detail/${board.id}`}>상세보기</a></div>
                        <div className="col-4">
                            <div>작성자 : {board.username}</div>
                        </div>
                        <hr/>

                    </ListGroup.Item>
                ))}
            </ListGroup>

            <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
                <Paging
                    totalRecords={totalItems}
                    pageLimit={9}
                    pageNeighbours={3}
                    onPageChanged={onPageChanged}
                    sizing=""
                    alignment="justify-content-center"
                />
            </div>
        </Container>
    );
}

export default UserBoard;
