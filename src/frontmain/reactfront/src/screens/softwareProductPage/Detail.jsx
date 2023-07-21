import React, { useEffect, useState, lazy } from "react";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faHeart,
  faShoppingCart,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { data } from "../../data";
import DataRequest from "./DataRequest";

import axios from "../Request/RequestConfig";
import { useParams } from "react-router-dom";

const CardFeaturedProduct = lazy(() =>
    import("../../components/card/CardFeaturedProduct")
);
const CardServices = lazy(() => import("../../components/card/CardServices"));
const Description = lazy(() => import("../../components/posting/Description"));
const RatingsReviews = lazy(() =>
    import("../../components/others/RatingsReviews")
);
const QuestionAnswer = lazy(() =>
    import("../../components/others/QuestionAnswer")
);

const ProductDetailView = () => {
  const [productList, setProductList] = useState([]);
  const [name, setName] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [isNew, setIsNew] = useState('');
  const [isHot, setIsHot] = useState('');
  const [price, setPrice] = useState('');
  const [originPrice,setOriginPrice] = useState('');
  const [discountPrice,setDiscountPrice] = useState('');
  const [highlights, setHighlights] = useState('');
  const [description, setDescription] = useState('');

  const [soldBy, setSoldBy] = useState('');
  const [category, setCategory] = useState('');

  const { id } = useParams();


  useEffect(() => {
    fetchPost()
        .then((postData) => {
          console.log(postData.data);
          DataRequest("/auth/software").then((requestData) => {
            console.log(requestData.data);
            setProductList(requestData.data);
          })

          setName(postData.data.name);
          setImgSrc(postData.data.thumbnail);
          setIsNew(postData.data.new);
          setIsHot(postData.data.hot);
          setPrice(postData.data.price);
          setOriginPrice(postData.data.originPrice);
          setDiscountPrice(postData.data.discountPrice);
          setHighlights(postData.data.highlights);
          setDescription(postData.data.description);

          setSoldBy(postData.data.soldBy);
          setCategory(postData.data.category);

        });
  }, []);

  const fetchPost = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      // Fetch post using `id`
      const response = await axios.get(`/auth/software/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'RefreshToken': `Bearer ${refreshToken}`,
        },
      });

      if (response.status === 200) {
        const postData = response.data;
        console.log(postData.data);
        return postData;
      } else {
        console.error('게시글을 가져오는데 실패했습니다.');
        throw new Error('게시글을 가져오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('인증되지 않은 사용자가 접근하려 합니다.', error);
      throw error;
    }
  };

  console.log(description);

  return (
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-8">
            <div className="row mb-3">
              <div className="col-md-5 text-center">
                <img
                    src={imgSrc}
                    className="img-fluid mb-3"
                    alt=""
                />
              </div>
              <div className="col-md-7">
                <h1 className="h5 d-inline me-2">
                  {name}
                </h1>
                <span className="badge bg-success me-2">{isNew}</span>
                <span className="badge bg-danger me-2">{isHot}</span>
                <div className="mb-3">
                  <IconStarFill className="text-warning me-1" />
                  <IconStarFill className="text-warning me-1" />
                  <IconStarFill className="text-warning me-1" />
                  <IconStarFill className="text-warning me-1" />
                  <IconStarFill className="text-secondary me-1" />|{" "}

                </div>
                <dl className="row small mb-3">
                  <dt className="col-sm-3">Category</dt>
                  <dd className="col-sm-9">{category}</dd>
                  <dt className="col-sm-3">Sold by</dt>
                  <dd className="col-sm-9">{soldBy}</dd>
                </dl>

                <div className="mb-3">
                  <span className="fw-bold h5 me-2">{price}</span>
                  <del className="small text-muted me-2">{originPrice}</del>
                  <span className="rounded p-1 bg-warning  me-2 small">
                    {'-'+discountPrice}
                  </span>
                </div>
                <div className="mb-3">
                  <div className="d-inline float-start me-2">
                    <div className="input-group input-group-sm mw-140">
                      <button
                          className="btn btn-primary text-white"
                          type="button"
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <input
                          type="text"
                          className="form-control"
                          defaultValue="1"
                      />
                      <button
                          className="btn btn-primary text-white"
                          type="button"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>
                  <button
                      type="button"
                      className="btn btn-sm btn-primary me-2"
                      title="Add to cart"
                  >
                    <FontAwesomeIcon icon={faCartPlus} /> Add to cart
                  </button>
                  <div style={{ marginTop:'10px'}}>
                  <button
                      type="button"
                      className="btn btn-sm btn-warning me-2"
                      title="Buy now"
                  >
                    <FontAwesomeIcon icon={faShoppingCart} /> Purchase
                  </button>
                  <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      title="Add to wishlist"
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                  </div>
                </div>
                <div>
                  <p className="fw-bold mb-2 small">
                    Product Highlights
                  </p>
                  <ul className="small">
                    <li>
                      {highlights}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a
                        className="nav-link active"
                        id="nav-details-tab"
                        data-bs-toggle="tab"
                        href="src/frontmain/reactfront/src/components/product#nav-details"
                        role="tab"
                        aria-controls="nav-details"
                        aria-selected="true"
                    >
                      Details
                    </a>
                    <a
                        className="nav-link"
                        id="nav-randr-tab"
                        data-bs-toggle="tab"
                        href="src/frontmain/reactfront/src/components/product#nav-randr"
                        role="tab"
                        aria-controls="nav-randr"
                        aria-selected="false"
                    >
                      Ratings & Reviews
                    </a>
                    <a
                        className="nav-link"
                        id="nav-faq-tab"
                        data-bs-toggle="tab"
                        href="src/frontmain/reactfront/src/components/product#nav-faq"
                        role="tab"
                        aria-controls="nav-faq"
                        aria-selected="false"
                    >
                      Questions and Answers
                    </a>
                  </div>
                </nav>
                <div className="tab-content p-3 small" id="nav-tabContent">
                  <div
                      className="tab-pane fade show active"
                      id="nav-details"
                      role="tabpanel"
                      aria-labelledby="nav-details-tab"
                  >
                    <Description desc={description}/>
                  </div>
                  <div
                      className="tab-pane fade"
                      id="nav-randr"
                      role="tabpanel"
                      aria-labelledby="nav-randr-tab"
                  >
                    {Array.from({ length: 5 }, (_, key) => (
                        <RatingsReviews key={key} />
                    ))}
                  </div>
                  <div
                      className="tab-pane fade"
                      id="nav-faq"
                      role="tabpanel"
                      aria-labelledby="nav-faq-tab"
                  >
                    <dl>
                      {Array.from({ length: 5 }, (_, key) => (
                          <QuestionAnswer key={key} />
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <CardFeaturedProduct data={productList} />
            <CardServices />
          </div>
        </div>
      </div>
  );
};

export default ProductDetailView;
