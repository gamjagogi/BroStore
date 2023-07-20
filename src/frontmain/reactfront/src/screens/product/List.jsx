import React, { lazy, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faBars, faPencilSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "../Request/RequestConfig";
import { Link } from "react-router-dom";

const Paging = lazy(() => import("../../components/Paging"));
const FilterCategory = lazy(() => import("../../components/filter/Category"));
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

    useEffect(() => {
        getProducts()
            .then((products) => {
                console.log('처음 렌더링');
                console.log(products.length);
                setTotalItems(products.length);
            })
            .catch((error) => {
                console.error("Error occurred while fetching products:", error);
            });
    }, []);

    const onPageChanged = (page) => {
        getProducts()
            .then((products) => {
                console.log("onPageChanged 진입");
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

    const getProducts = () => {
        return new Promise((resolve, reject) => {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

            if (accessToken && refreshToken) {
                axios
                    .get("/auth/software", {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${accessToken}`,
                            RefreshToken: `Bearer ${refreshToken}`,
                        },
                    })
                    .then((response) => {
                        if (response.status === 200) {
                            const products = response.data.data;
                            console.log(products);
                            resolve(products);
                            return products;
                        } else {
                            console.log("인증된 유저만 접근 가능합니다.");
                            reject(new Error("인증된 유저만 접근 가능합니다."));
                        }
                    })
                    .catch((error) => {
                        console.error("인증되지 않은 사용자가 접근하려 합니다.", error);
                        console.log("인증된 유저만 접근 가능합니다.");
                        reject(new Error("인증되지 않은 사용자가 접근하려 합니다."));
                    });
            } else {
                console.log("로그인이 필요합니다.");
                reject(new Error("로그인이 필요합니다."));
            }
        });
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
                    <span className="display-5 px-3 bg-white rounded shadow">T-Shirts</span>
                </div>
            </div>
            <br />

            <div className="container-fluid mb-3">
                <div className="row">
                    <div className="col-md-3">
                        <FilterCategory />
                        <FilterPrice />
                        <FilterStar />
                        <CardServices />
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-7">
                <span className="align-middle fw-bold">
                  {totalItems} results for <span className="text-warning">""</span>
                </span>
                            </div>

                            <div className="col-5 d-flex justify-content-end">
                                <button aria-label="Grid" type="button" style={{ marginRight: "0.5em" }}>
                                    <Link to="/posting">
                                        <FontAwesomeIcon icon={faPencilSquare} />
                                    </Link>
                                </button>
                                <select className="form-select mw-180 float-start" aria-label="Default select">
                                    <option value={1}>Most Popular</option>
                                    <option value={2}>Latest items</option>
                                    <option value={3}>Trending</option>
                                    <option value={4}>Price low to high</option>
                                    <option value={4}>Price high to low</option>
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
