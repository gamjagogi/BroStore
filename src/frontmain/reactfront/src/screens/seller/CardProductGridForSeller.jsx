import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import axios from "../Request/RequestConfig";


const CardProductGridForSeller = (props) => {
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const product = props.data;
  //----------------------
  const id = product.id;
  const category = product.category;
  const description = product.description;
  const discountPercentage = product.discountPercentage;
  const discountPrice = product.discountPrice;
  const freeShipping = product.isFreeShipping?true:false;
  const isHot = product.hot?true:false;
  const name = product.name;
  const isNew = product.new?true:false;
  const originPrice = product.originPrice?product.originPrice:0;
  const price = product.price;
  const soldBy = product.soldBy;
  const star = product.star;
  const thumbnail = product.thumbnail;
  const highlights = product.highlights;
  const boardUserId = product.userId;

  //---------------------
  const parser = new DOMParser();
  const doc = parser.parseFromString(product.description, "text/html");
  console.log(doc);
  console.log(product.id);

  const plainText = doc.body.textContent;
  console.log(plainText);

  const onFixProduct = () => {

    navigate(`/selling/${product.id}?id=${id}&category=${category}&description=${description}&discountPercentage=${discountPercentage}&discountPrice=${discountPrice}&freeShipping=${freeShipping}&isHot=${isHot}&isNew=${isNew}&name=${name}&originPrice=${originPrice}&price=${price}&soldBy=${soldBy}&star=${star}&thumbnail=${thumbnail}&highlights=${highlights}`);
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
        const response = await axios.post(`/auth/delivery/delete/${id}/${userId}`,JSON.stringify(""),{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'RefreshToken': `Bearer ${refreshToken}`,
          }
        });

        if (response.status == 200) {
          // 응답 성공 시 처리할 작업
          alert('삭제 성공');
          window.location.reload();

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

  return (
    <div className="card">
      <img src={product.thumbnail} className="card-img-top" alt="..." />
      {product.isNew && (
        <span className="badge bg-success position-absolute mt-2 ms-2">
          New
        </span>
      )}
      {product.isHot && (
        <span className="badge bg-danger position-absolute r-0 mt-2 me-2">
          Hot
        </span>
      )}
      {(product.discountPercentage > 0 || product.discountPrice > 0) && (
        <span
          className={`rounded position-absolute p-2 bg-warning  ms-2 small ${
            product.isNew ? "mt-5" : "mt-2"
          }`}
        >
          -
          {product.discountPercentage > 0
            ? product.discountPercentage + "%"
            : "$" + product.discountPrice}
        </span>
      )}
      <div className="card-body">
        <h6 className="card-subtitle mb-2">
          <Link to={product.link + product.id} className="text-decoration-none">
            {product.name}
          </Link>
        </h6>
        <div className="my-2">
          <span className="fw-bold h5">${product.price}</span>
          {product.originPrice > 0 && (
            <del className="small text-muted ms-2">${product.originPrice}</del>
          )}
          <span className="ms-2">
            {Array.from({ length: product.star }, (_, key) => (
              <IconStarFill className="text-warning me-1" key={key} />
            ))}
          </span>
        </div>
        <div className="my-2">
          <span className="fw-bold h9">Category : {product.category}</span>
        </div>
        <div className="btn-group  d-flex" role="group">
          <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              title="Add to wishlist"
              onClick={onFixProduct}
          >
            <span>수정하기</span>
          </button>
          <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              title="Add to wishlist"
              onClick={handleDelete}
          >
            <span style={{color:'red'}}>삭제하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProductGridForSeller;
