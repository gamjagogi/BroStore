import React, {useState, useEffect} from 'react';
import {Container} from "../../components/Styles/Container/Container.style";
import {useLocation, useNavigate} from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import axios from '../Request/RequestConfig.js';
import Paging from "../../components/Paging";
import DeliveryCategoryConfig from "../deliveryProductPage/category/DeliveryCategoryConfig";


const UserBoard = () => {
    const [loginError, setLoginError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [currentProducts, setCurrentProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(null);
    const [totalItems, setTotalItems] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        handlePage().then((products) => {
            console.log(products.length);
            setTotalItems(products.length);
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
                const response = await axios.get(`/auth/board/${id}`, {
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
                    setLoginError('인증된 유저만 접근 가능합니다.');
                }
            } else {
                setLoginError('로그인이 필요합니다.');
            }
        } catch (error) {
            console.error('에러발생..', error);
            setLoginError('에러 발생.');
        }
    };

    const handlePosting = () => {
        navigate('/editor');
    }

    return (
        <Container>
            <header>
                <h1> UserBoard </h1>
            </header>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <form action="/" method="get">
                    <input type="text" placeholder="Search" name="keyword"/>
                    <button style={{marginLeft: '0.5em'}}>Search</button>
                </form>
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '0.5em'}}>
                <form action="/" method="get">
                    <button onClick={handlePosting} style={{marginLeft: '0.5em'}}>글작성</button>
                </form>
            </div>

            <ListGroup as="ol" numbered={true}>

                {currentProducts.map((board) => (
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" key={board.id}>
                        <div className="ms-2 me-auto">
                            <h4 className="fw-bold">{board.title}</h4>
                            <a href={`/detail/${board.id}`}>상세보기</a>
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

export default UserBoard;
