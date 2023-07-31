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
    const navigate = useNavigate();

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
            })
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

    return (
        <Container>
            <header>
                <h1> Q/A </h1>
            </header>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <form action="/" method="get">
                    <input type="text" placeholder="Search" name="keyword"/>
                    <button style={{marginLeft: '0.5em'}}>Search</button>
                </form>
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '0.5em',marginBottom:'1em'}}>
                <select className="form-select mw-180 float-start" aria-label="Default select" value={selectedValue} onChange={handleSelectChange}>
                    <option value={1}>All</option>
                    <option value={2} >판매자 신청</option>
                </select>
                    <button onClick={handlePosting} style={{marginLeft: '0.5em'}}>글작성</button>
            </div>

            <ListGroup as="ol" numbered={true}>

                {currentProducts.map((board) => (
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" key={board.id}>
                        <div className="ms-2 me-auto">
                            <h4 className="fw-bold">{board.title}</h4>
                            <a href={`/question/detail/${board.id}`}>상세보기</a>
                        </div>
                        <div>
                            <div>작성자 : {board.username}</div>
                        </div>
                        <hr/>
                        {console.log(board.thumbnail)}
                        <Image src={board.thumbnail} style={{height: "100px"}} fluid/>
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