import React, {useState, useEffect} from 'react';
import {Container} from "../../components/Styles/Container/Container.style";
import {useLocation, useNavigate} from "react-router-dom";

import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import axios from '../Request/RequestConfig.js';
import Paging from "../../components/Paging";



const Notice = () => {
    const [loginError, setLoginError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [currentProducts, setCurrentProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(null);
    const [totalItems, setTotalItems] = useState(0);
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const MAX_DESCRIPTION_LENGTH = 100;

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



    const contentLengthConfig = (props) => {
        const truncatedDescription = props.content.substring(0, MAX_DESCRIPTION_LENGTH);

        const parser = new DOMParser();
        const doc = parser.parseFromString(truncatedDescription, "text/html");
        console.log(doc);
        const plainText = doc.body.textContent;
        console.log(plainText);
        return plainText;
    }


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
                const response = await axios.get("/notice", {
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
        const userRole = sessionStorage.getItem('userRole');
        if(!userId){
            alert('로그인이 필요합니다.');
            return window.location.reload();
        }
        if(!userRole.match("ROLE_ADMIN")){
            console.log(userRole);
            alert('권한이 없습니다..');
            return window.location.reload();
        }
        navigate('/noticeEditor');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`/notice/search?keyword=${keyword}`, {
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
                <h1 style={{fontSize:'80px'}}> Notice </h1>
            </header>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <input type="text" placeholder="Search" name="search" onChange={onSearching}/>
                <button onClick={handleSubmit} style={{marginLeft: '0.5em'}}>Search</button>
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '0.5em'}}>
                    <button onClick={handlePosting} style={{marginLeft: '0.5em'}}>글작성</button>
            </div>

            <ListGroup as="ol" style={{margin:'20px'}}>
                {currentProducts.map((board) => (
                    <ListGroup.Item as="li" key={board.id}>
                        <div className="row" style={{ minHeight: '130px' }}>
                            <div className="col-8 d-flex justify-content-center align-items-center text-break text-wrap"> {/* d-flex와 justify-content-center, align-items-center를 추가 */}
                                <h4 className="fw-bold">{board.title}</h4>
                            </div>

                            <div className="col-4 d-flex justify-content-center align-items-center"> {/* d-flex와 justify-content-center, align-items-center를 추가 */}
                                <div style={{fontStyle:'italic'}}>작성자: {board.username}</div>
                            </div>

                            <div className="col-12 d-flex justify-content-center text-break text-wrap"> {/* d-flex와 justify-content-center를 추가 */}
                                <a href={`/notice/${board.id}`}>
                                    {contentLengthConfig(board)?contentLengthConfig(board):'상세보기'}
                                </a>
                            </div>
                        </div>
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

export default Notice;
