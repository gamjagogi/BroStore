import React, { lazy, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faBars, faPencilSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "../Request/RequestConfig";
import {Link, useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';

const Paging = lazy(() => import("../../components/Paging"));
const CardProductListForSeller = lazy(() => import("./CardProductListForSeller"));
const CardProductGridForSeller = lazy(() => import("./CardProductGridForSeller"))



const SellingPage = () => {
    const navigate = useNavigate();
    const [sellingList, setSellingList ] = useState([]);
    const [currentProducts, setCurrentProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(null);
    const [totalPages, setTotalPages] = useState(null);
    const [totalItems, setTotalItems] = useState(0);
    const [view, setView] = useState("list");

    useEffect(()=>{
        onSellingPage();
    },[])


    const onSellingPage = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            const id = sessionStorage.getItem('userData2'); // 현재 로그인중인 userId
            console.log(id);

            if (accessToken && refreshToken) {
                const response = await axios.get(`/manager/orders/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'RefreshToken': `Bearer ${refreshToken}`,
                    },
                });

                if (response.status == 200) {
                    const data = await response.data.data;
                    console.log(data);
                    setTotalItems(data.length);
                    setCurrentPage(1);
                    setCurrentProducts(data.slice(0,9));
                    setSellingList(data);

                } else {
                    console.error('장바구니를 가져오는대 실패했습니다.');
                }
            } else {
                console.error('인증되지 않은 사용자가 접근하려 합니다.');
            }
        } catch (error) {
            console.error('에러발생..', error);
        }
    };


    const onPageChanged = (page) => {

                const { currentPage, totalPages, pageLimit } = page;
                const offset = (currentPage - 1) * pageLimit;
                const currentProducts = sellingList.slice(offset, offset + pageLimit);

                setCurrentPage(currentPage);
                setCurrentProducts(currentProducts);
                setTotalPages(totalPages);
    };

    const onChangeView = (view) => {
        setView(view);
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
                    <span className="display-5 px-3 bg-white rounded shadow">Selling Product</span>
                </div>
            </div>
            <br />

            <div className="container-fluid mb-3">
                <div className="row">
                    <div className="col-md-3" >
                        <Button href="/selling/orders">주문 내역</Button>
                    </div>
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-7">
                <span className="align-middle fw-bold" style={{marginLeft:"100px"}}>
                  판매중인 상품 : results {totalItems}
                </span>
                            </div>

                            <div className="col-5 d-flex justify-content-end">
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
                                            <CardProductGridForSeller data={product} />
                                        </div>
                                    );
                                })}
                            {view === "list" &&
                                currentProducts.map((product, idx) => {
                                    return (
                                        <div key={idx} className="col-md-12">
                                            <CardProductListForSeller data={product} />
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

export default SellingPage;
