import React, { lazy, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faBars, faPencilSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "../Request/RequestConfig";
import {Link, useNavigate} from "react-router-dom";
import CategoryConfig from "./category/CategoryConfig";
import {Button} from "react-bootstrap";

const Paging = lazy(() => import("../../components/Paging"));
const FilterCategory = lazy(() => import("../../components/filter/SoftwareCategory"));
const FilterPrice = lazy(() => import("../../components/filter/Price"));
const FilterStar = lazy(() => import("../../components/filter/Star"));
const CardServices = lazy(() => import("../../components/card/CardServices"));
const CardProductGrid = lazy(() => import("../../components/card/CardProductGrid"));
const CardProductList = lazy(() => import("../../components/card/CardProductList"));



const ProductListView = () => {
    const [currentProducts, setCurrentProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(null);
    const [totalPages, setTotalPages] = useState(null);
    const [totalItems, setTotalItems] = useState(0);
    const [view, setView] = useState("list");
    const [category, setCategory] = useState('');
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('userData2');
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        if(userId==null){
            alert('로그인이 필요합니다.');
            return navigate('/');
        }
        CategoryConfig(category)
            .then((products) => {
                console.log('처음 렌더링');
                setTotalItems(products.length);

                // 현재 페이지를 1로 설정하여 1페이지의 상품들만 보여줌
                setCurrentPage(1);

                // 1페이지의 상품들만 설정
                setCurrentProducts(products.slice(0, 9));
            })
            .catch((error) => {
                console.error("Error occurred while fetching products:", error);
                alert('로그인이 필요합니다.');
                return navigate('/');
            });
        return;
    }, []);


    useEffect(() => {
        CategoryConfig(category)
            .then((products) => {
                console.log('처음 렌더링');
                console.log(products);
                setTotalItems(products.length);

                // 현재 페이지를 1로 설정하여 1페이지의 상품들만 보여줌
                setCurrentPage(1);

                // 1페이지의 상품들만 설정
                setCurrentProducts(products.slice(0, 9));

            })
            .catch((error) => {
                console.error("Error occurred while fetching products:", error);
            });
        return;
    }, [category]);


    const onPageChanged = (page) => {
        CategoryConfig(category)
            .then((products) => {

                console.log(products);
                const { currentPage, totalPages, pageLimit } = page;
                console.log(currentPage, totalPages, pageLimit);
                const offset = (currentPage - 1) * pageLimit;
                console.log(offset);
                const currentProducts = products.slice(offset, offset + pageLimit);
                console.log(currentProducts);

                setCurrentPage(currentPage);
                setCurrentProducts(currentProducts);
                setTotalPages(totalPages);
            })
            .catch((error) => {
                console.error("Error occurred while fetching products:", error);
            });
    };

    const onChangeView = (view) => {
        setView(view);
    };

    const onChangeCategory = (props) => {
        console.log(props);
        setCategory(props);
    }



    const onSearching = (props) => {
        const value = props.target.value;
        console.log(value);
        setKeyword(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        try {
            const response = await axios.get(`/auth/software/search?keyword=${keyword}`, {
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

    return (
        <React.Fragment>
            <div
                className="p-5 bg-primary bs-cover"
                style={{
                    backgroundImage: "url(../../images/banner/50-Banner.webp)",
                }}
            >
                <div className="container text-center">
                    <span className="display-5 px-3 bg-white rounded shadow">Software</span>
                </div>
            </div>
            <br />

            <div className="container-fluid mb-3">
                <div className="row">
                    <div className="col-md-3">
                        <div style={{display: 'flex', marginBottom: '20px'}}>
                            <input className='col-7' type="text" placeholder="Search" name="search" onChange={onSearching}/>
                            <Button className='col-5' onClick={handleSubmit} style={{marginLeft: '0.5em'}}>Search</Button>
                        </div>
                        <FilterCategory
                            onChangeCategory={onChangeCategory}
                        />
                        <CardServices />
                    </div>

                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-7">
                <span className="align-middle fw-bold">
                    results <span className="text">{totalItems}</span>
                </span>
                            </div>

                            <div className="col-5 d-flex justify-content-end">
                                <Link to="/posting" style={{ marginRight: '0.5em',marginTop:'5px' }}>
                                    <button aria-label="Grid" style={{ border: 'none', cursor: 'pointer' }}>
                                        <FontAwesomeIcon style={{scale:'150%'}} icon={faPencilSquare} />
                                    </button>
                                </Link>
                                <select className="form-select mw-180 float-start" aria-label="Default select">
                                    <option value={1}>Most Popular</option>
                                    <option value={2}>Latest items</option>
                                    <option value={3}>준비중..</option>
                                </select>
                                <div className="btn-group ms-3" role="group">
                                    <button
                                        aria-label="Grid"
                                        type="button"
                                        onClick={() => onChangeView("grid")}
                                        className={`btn ${view === "grid" ? "btn-primary" : "btn-outline-primary"}`}
                                    >
                                        <FontAwesomeIcon icon={faTh} />
                                    </button>
                                    <button
                                        aria-label="List"
                                        type="button"
                                        onClick={() => onChangeView("list")}
                                        className={`btn ${view === "list" ? "btn-primary" : "btn-outline-primary"}`}
                                    >
                                        <FontAwesomeIcon icon={faBars} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row g-3">
                            {view === "grid" &&
                                currentProducts.map((product, idx) => {
                                    return (
                                        <div key={idx} className="col-md-4">
                                            <CardProductGrid data={product} />
                                        </div>
                                    );
                                })}
                            {view === "list" &&
                                currentProducts.map((product, idx) => {
                                    return (
                                        <div key={idx} className="col-md-12">
                                            <CardProductList data={product} />
                                        </div>
                                    );
                                })}
                        </div>
                        <hr />
                        <Paging
                            totalRecords={totalItems}
                            pageLimit={9}
                            pageNeighbours={3}
                            onPageChanged={onPageChanged}
                            sizing=""
                            alignment="justify-content-center"
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ProductListView;
