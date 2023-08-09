import React, { useEffect, useState, lazy } from "react";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { data } from "../../data";
import DataRequest from "./DataRequest";

import axios from "../Request/RequestConfig";
import {useNavigate, useParams} from "react-router-dom";
import Button from "react-bootstrap/Button";

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

const Detail = () => {
  const [loginError, setLoginError] = useState('');
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
  const [boardUserId,setBoardUserId] = useState('');
  const [soldBy, setSoldBy] = useState('');
  const [category, setCategory] = useState('');
  const [star, setStar] = useState(5);
  const [discountPercent, setDiscountPercent] = useState('');
  const [uploadFile, setUploadFile] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  const commentRowStyle = {
    wordWrap: 'break-word', // 긴 텍스트를 자동으로 줄바꿈
    whiteSpace: 'pre-wrap', // 줄바꿈과 공백을 유지하도록 설정
  };



  useEffect(() => {
    fetchPost()
        .then((postData) => {
          console.log(postData.data);
          DataRequest("/auth/software").then((requestData) => {
            console.log(requestData.data);
            setProductList(requestData.data);
          })
          console.log('페치한 데이터 뿌리기!!');
          console.log(postData.data.discountPercent);

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
          setBoardUserId(postData.data.userId);
          setStar(postData.data.star);
          setDiscountPercent(postData.data.discountPercent);
          setUploadFile(postData.data.uploadFile);
          console.log(postData.data.uploadFile);
        });
    return;
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

  const onUpdatePosting = () => {
    const userId = sessionStorage.getItem('userData2');

    if(userId!=boardUserId){
      alert('권한이 없습니다.');
      return window.location.reload();
    }
    console.log(discountPercent);
    navigate(`/software/boardFix?softwareId=${id}&userId=${userId}&title=${name}&imgSrc=${imgSrc}&isNew=${isNew}&isHot=${isHot}&price=${price}&originPrice=${originPrice}&discountPrice=${discountPrice}&highlights=${highlights}&description=${description}&category=${category}&soldBy=${soldBy}&star=${star}&discountPercent=${discountPercent}&uploadFile=${uploadFile}`);
  }

  const handleDelete = async () => {
    const userId = sessionStorage.getItem('userData2');
    if (boardUserId != userId) {
      alert('권한이 없습니다.');
      return window.location.reload();
    }

    // 확인 문구
    const shouldDelete = window.confirm('정말로 삭제하시겠습니까?');

    if (!shouldDelete) {
      return; // 사용자가 "취소"를 선택한 경우 아무 작업도 하지 않고 종료
    }


    try {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      console.log(accessToken);
      console.log(refreshToken);

      if(accessToken && refreshToken){
        const response = await axios.post(`/auth/software/delete/${id}/${userId}`,JSON.stringify(""),{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'RefreshToken': `Bearer ${refreshToken}`,
          }
        });

        if (response.status == 200) {
          // 응답 성공 시 처리할 작업
          alert('삭제 성공');
          navigate('/software');

        } else {
          // 응답 실패 시 처리할 작업
          const errorMessages = await response.data;
          console.log(errorMessages.errors);
          const errors = errorMessages.errors;
          for (const error of errors) {
            console.log(error.defaultMessage);
            alert(error.defaultMessage);
          }
        }
      }else {
        setLoginError('인증 권한을 가진 유저만 접근 가능합니다.'); // 로그인되지 않은 경우 처리
      }
    } catch (error) {
      console.error("에러발생", error);
    }
  }


  const handleDownload = () => {
      window.location.href = uploadFile;
  }


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
                <h1 className="h5 d-inline me-2" style={commentRowStyle}>
                  {name}
                </h1>
                <span className="badge bg-success me-2">{isNew}</span>
                <span className="badge bg-danger me-2">{isHot}</span>
                <div className="mb-3">
                  <div>
                    {star > 0 &&
                        Array.from({ length: 5 }, (_, key) => {
                          if (key <= star-1)
                            return (
                                <IconStarFill className="text-warning me-1" key={key} />
                            );
                          else
                            return (
                                <IconStarFill className="text-secondary me-1" key={key} />
                            );
                        })}
                  </div>
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

                  {discountPrice?(<span className="rounded p-1 bg-warning  me-2 small">
                    {'-'+discountPrice}
                  </span>):''}

                </div>
                <div className="mb-3">
                  <div style={{ marginTop:'10px'}}>
                  <button
                      type="button"
                      className="btn btn-sm btn-warning me-2"
                      title="Buy now"
                      onClick={handleDownload}
                  >
                    <FontAwesomeIcon icon={faShoppingCart} /> Download
                  </button>
                  </div>
                </div>
                <div style={commentRowStyle}>
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
                    <Button style={{height:'40px', marginRight:'3px'}} onClick={onUpdatePosting}>
                      수정
                    </Button>
                    <Button style={{height:'40px'}} onClick={handleDelete}>
                      삭제
                    </Button>
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

export default Detail;
