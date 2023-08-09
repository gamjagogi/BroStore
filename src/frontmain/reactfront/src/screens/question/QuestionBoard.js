import React, {useState, useEffect} from 'react';
import {Container} from "../../components/Styles/Container/Container.style";
import {useLocation, useNavigate} from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import axios from '../Request/RequestConfig.js';
import Paging from "../../components/Paging";
import QuestionBoardCategoryConfig from "./category/QuestionBoardCategoryConfig";


const QuestionBoard = () => {
    const [loginError, setLoginError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [currentProducts, setCurrentProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(null);
    const [totalItems, setTotalItems] = useState(0);
    const [selectedValue, setSelectedValue] = useState(1);
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('userData2');

    const commentRowStyle = {
        wordWrap: 'break-word', // 긴 텍스트를 자동으로 줄바꿈
        whiteSpace: 'pre-wrap', // 줄바꿈과 공백을 유지하도록 설정
    };

    useEffect(() => {
        handlePage().then((products) => {
            console.log(products.length);
            setTotalItems(products.length);

            // 현재 페이지를 1로 설정하여 1페이지의 상품들만 보여줌
            setCurrentPage(1);

            // 1페이지의 상품들만 설정
            setCurrentProducts(products.slice(0, 9));

        })
            .catch((error) => {
                console.error('Error occurred while fetching products:', error);
                alert('로그인이 필요합니다.');
                return navigate('/');
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
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            const userId = sessionStorage.getItem('userData2');
            console.log(userId);
            const id = userId;

            if (accessToken && refreshToken) {
                const response = await axios.get(`/auth/question/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'RefreshToken': `Bearer ${refreshToken}`,
                    },
                });

                if (response.status == 200) {
                    const data = await response.data.data;
                    console.log(data);
                    return data;
                } else {
                    console.error("게시글을 가져오지 못했습니다.");
                }
            } else {
                console.error("로그인이 필요합니다.");
                setLoginError('로그인이 필요합니다.');
            }
        } catch (error) {
            console.error('에러발생..', error);
            setLoginError('에러 발생.');
        }
    };

    const handlePosting = () => {
        navigate('/question/editor');
    }

    // 선택한 값을 처리하는 함수
    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedValue(selectedValue);

        // 여기서 특정 메서드를 실행하면 됩니다.
        if (selectedValue === "2") {
            // 판매자 신청을 선택했을 때 실행할 메서드를 호출
            QuestionBoardCategoryConfig("RequestSeller")
                .then((products) => {
                console.log(products.length);
                setTotalItems(products.length);

                // 현재 페이지를 1로 설정하여 1페이지의 상품들만 보여줌
                setCurrentPage(1);

                // 1페이지의 상품들만 설정
                setCurrentProducts(products.slice(0, 9));
            }).catch((error) => {
                console.error('Error occurred while fetching products:', error);
            });
        }else{
            handlePage().then((products) => {
                console.log(products.length);
                setTotalItems(products.length);

                // 현재 페이지를 1로 설정하여 1페이지의 상품들만 보여줌
                setCurrentPage(1);

                // 1페이지의 상품들만 설정
                setCurrentProducts(products.slice(0, 9));

            })
                .catch((error) => {
                    console.error('Error occurred while fetching products:', error);
                })
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await axios.get(`/auth/question/search?keyword=${keyword}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'RefreshToken': `Bearer ${refreshToken}`,
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
                <h1 style={{fontSize:'80px'}}> QA게시판 </h1>
            </header>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <input type="text" placeholder="Search" name="search" onChange={onSearching}/>
                <button onClick={handleSubmit} style={{marginLeft: '0.5em'}}>Search</button>

            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '0.5em',marginBottom:'1em'}}>
                <select className="form-select mw-180 float-start" aria-label="Default select" value={selectedValue} onChange={handleSelectChange}>
                    <option value={1}>All</option>
                    <option value={2} >판매자 신청</option>
                </select>
                    <button onClick={handlePosting} style={{marginLeft: '0.5em'}}>글작성</button>
            </div>

            <ListGroup as="ol" numbered={true} style={{margin:'20px'}}>
                {currentProducts.map((board) => (
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start"style={{minHeight:'130px'}} key={board.id}>
                        <div className="ms-3 me-auto col-4">
                            <h4 className="fw-bold">{board.title}</h4>

                        </div>
                        <div className="col-4"> <a style={{fontSize:'25px'}} href={`/question/detail/${board.id}`}>상세보기</a></div>
                        <div className="col-4">
                            <div>작성자 : {board.username}</div>
                            <div>카테고리 : {board.category=='RequestSeller'?'판매자신청':'All'}</div>
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

export default QuestionBoard;
