import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { ReactComponent as IconTruckFill } from "bootstrap-icons/icons/truck.svg";
import axios from "../Request/RequestConfig";

const CardProductListForSeller = (props) => {
  const [loginError, setLoginError] = useState('');
  const product = props.data;
  console.log(product);
  const navigate = useNavigate();

  //----------------------
  const id = product.id;
  const category = product.category;
  const description = product.description;
  const discountPercent = product.discountPercent;
  const discountPrice = product.discountPrice;
  const freeShipping = product.freeShipping==true?product.freeShipping:false;
  const isHot = product.hot==true?product.hot:false;
  const name = product.name;
  const isNew = product.new==true?product.new:false;
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


  const plainText = doc.body.textContent;
  console.log(plainText);

  const onFixProduct = () => {

    navigate(`/selling/${product.id}?id=${id}&category=${category}&description=${description}&discountPercent=${discountPercent}&discountPrice=${discountPrice}&freeShipping=${freeShipping}&isHot=${isHot}&isNew=${isNew}&name=${name}&originPrice=${originPrice}&price=${price}&soldBy=${soldBy}&star=${star}&thumbnail=${thumbnail}&highlights=${highlights}`);
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
      <div className="row g-0">
        <div className="col-md-3 text-center">
          <img src={product.thumbnail} className="img-fluid" alt="..." />
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h6 className="card-subtitle me-2 d-inline">
              <Link to={product.link + product.id} className="text-decoration-none">
                {product.name}
              </Link>
            </h6>
            {product.isNew && (
              <span className="badge bg-success me-2">New</span>
            )}
            {product.isHot && <span className="badge bg-danger me-2">Hot</span>}

            <div>
              {product.star > 0 &&
                Array.from({ length: 5 }, (_, key) => {
                  if (key <= product.star -1)
                    return (
                      <IconStarFill className="text-warning me-1" key={key} />
                    );
                  else
                    return (
                      <IconStarFill className="text-secondary me-1" key={key} />
                    );
                })}
            </div>
            {product.description &&
              product.description.includes("|") === false && (
                <p className="small mt-2">{plainText}</p>
              )}
            {product.description && product.description.includes("|") && (
              <ul className="mt-2">
                {product.description.split("|").map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-body">
          <div className="mb-2">
            <span className="fw-bold h5">${product.price}</span>
            {product.originPrice > 0 && (
              <del className="small text-muted ms-2">
                ${product.originPrice}원
              </del>
            )}
            {(product.discountPercent > 0 || product.discountPrice > 0) && (
              <span className={`rounded p-1 bg-warning ms-2 small`}>
                -{product.discountPrice+'원'+' '}-
                {product.discountPercent > 0
                  ? product.discountPercent + "%"
                  : "$" + product.discountPrice}
              </span>
            )}
          </div>
          {product.isFreeShipping && (
            <p className="text-success small mb-2">
              <IconTruckFill /> Free shipping
            </p>
          )}

          <div className="btn-group d-flex" role="group" style={{width : '100%'}}>
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
            <br />

            <div className="mb-2">
              <span className="fw-bold h9">Category : {product.category}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CardProductListForSeller);
