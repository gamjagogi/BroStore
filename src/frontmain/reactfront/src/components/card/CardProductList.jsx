import React, {useState} from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { ReactComponent as IconTruckFill } from "bootstrap-icons/icons/truck.svg";

const CardProductList = (props) => {
  const product = props.data;
  const MAX_DESCRIPTION_LENGTH = 100; // 표시될 최대 글자 수를 설정합니다.
  const [showFullDescription, setShowFullDescription] = useState(false);


  // 더보기.. 토글
  const toggleShowFullDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  // 설명(description) 텍스트를 최대 길이로 자릅니다.
  const truncatedDescription = product.description.substring(0, MAX_DESCRIPTION_LENGTH);




  const parser = new DOMParser();
  const doc = parser.parseFromString(truncatedDescription, "text/html");
  console.log(doc);


  const plainText = doc.body.textContent;
  console.log(plainText);



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
                  if (key <= product.star)
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
                ${product.originPrice}
              </del>
            )}
            {(product.discountPercentage > 0 || product.discountPrice > 0) && (
              <span className={`rounded p-1 bg-warning ms-2 small`}>
                -
                {product.discountPercentage > 0
                  ? product.discountPercentage + "%"
                  : "$" + product.discountPrice}
              </span>
            )}
          </div>
          {product.isFreeShipping && (
            <p className="text-success small mb-2">
              <IconTruckFill /> Free shipping
            </p>
          )}

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

export default React.memo(CardProductList);
