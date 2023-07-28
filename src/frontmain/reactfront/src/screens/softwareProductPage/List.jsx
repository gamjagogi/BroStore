import React, { lazy, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faBars, faPencilSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "../Request/RequestConfig";
import { Link } from "react-router-dom";
import CategoryConfig from "./category/CategoryConfig";

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

    useEffect(() => {
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
            });
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
    }, [category]);


    const onPageChanged = (page) => {
        CategoryConfig(category)
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

    const onChangeCategory = (props) => {
        console.log(props);
        setCategory(props);
    }

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
                        <FilterCategory
                            onChangeCategory={onChangeCategory}
                        />
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
