import React, {lazy, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconHeartFill } from "bootstrap-icons/icons/heart-fill.svg";
import { ReactComponent as IconTrash } from "bootstrap-icons/icons/trash.svg";
import { ReactComponent as IconChevronRight } from "bootstrap-icons/icons/chevron-right.svg";
import { ReactComponent as IconChevronLeft } from "bootstrap-icons/icons/chevron-left.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "../Request/RequestConfig";
//import CartProduct from "./CartProduct";

const CartProduct = lazy(() => import("./CartProduct"))

const CouponApplyForm = lazy(() =>
    import("../../components/others/CouponApplyForm")
);

const CartView = () => {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountTotalPrice, setDiscountTotalPrice] = useState(totalPrice);

  const onSubmitApplyCouponCode = async (values) => {
    alert(JSON.stringify(values));
  };


  const handleCountChange = async(cartItem, count) => {

    try {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      const userId = sessionStorage.getItem('userData2'); // 현재 로그인중인 userId
      console.log(userId);

      const id = userId;
      const cartItemId = cartItem;
      const changeCount = count;

      console.log(cartItemId,changeCount);

      if (accessToken && refreshToken) {
        const response = await axios.post(`/auth/cart/change/${id}/${cartItemId}`,JSON.stringify(changeCount) ,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'RefreshToken': `Bearer ${refreshToken}`,
          },
        });

        if (response.status == 200) {
          const data = await response.data.data;
          setItemList(data.deliveryList);
          console.log(data.totalCount);
          setTotalCount(data.totalCount);
          setTotalPrice(data.totalPrice);

        } else {
          console.error('장바구니를 가져오는대 실패했습니다.');
          throw new Error('장바구니를 가져오는대 실패했습니다.');
        }
      } else {
        console.error('인증되지 않은 사용자가 접근하려 합니다.');
        throw new Error('인증되지 않은 사용자가 접근하려 합니다.');
      }
    } catch (error) {
      console.error('에러발생..', error);
      alert('삭제가 정상적으로 동작하지 않았습니다..');
      navigate('/cart');
    }
  }


  const handleDelete = async(event) => {

    try {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      const userId = sessionStorage.getItem('userData2'); // 현재 로그인중인 userId
      console.log(userId);

      const id = userId;
      const cartItemId = event;

      if (accessToken && refreshToken) {
        const response = await axios.get(`/auth/cart/delete/${id}/${cartItemId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'RefreshToken': `Bearer ${refreshToken}`,
          },
        });

        if (response.status == 200) {
          const data = await response.data.data;
          alert('삭제성공');
          setItemList(data.deliveryList);
          setTotalCount(data.totalCount);
          setTotalPrice(data.totalPrice);

        } else {
          console.error('장바구니를 가져오는대 실패했습니다.');
          throw new Error('장바구니를 가져오는대 실패했습니다.');
        }
      } else {
        console.error('인증되지 않은 사용자가 접근하려 합니다.');
        throw new Error('인증되지 않은 사용자가 접근하려 합니다.');
      }
    } catch (error) {
      console.error('에러발생..', error);
      alert('삭제가 정상적으로 동작하지 않았습니다..');
      navigate('/cart');
    }
  }

  useEffect(() => {
    onCartPage();
  }, []);




  const onCartPage = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      const userData = sessionStorage.getItem('userData'); // 현재 로그인중인 username
      const userData2 = sessionStorage.getItem('userData2'); // 현재 로그인중인 userId
      console.log(userData);
      console.log(userData2);

      const id = userData2;

      if (accessToken && refreshToken) {
        const response = await axios.get(`/auth/cart/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'RefreshToken': `Bearer ${refreshToken}`,
          },
        });

        if (response.status == 200) {
          const data = await response.data.data;
          console.log(data);
          console.log(data.deliveryList);

          setItemList(data.deliveryList);
          setTotalCount(data.totalCount);
          setTotalPrice(data.totalPrice);

        } else {
          console.error('장바구니를 가져오는대 실패했습니다.');
          throw new Error('장바구니를 가져오는대 실패했습니다.');
        }
      } else {
        console.error('인증되지 않은 사용자가 접근하려 합니다.');
        throw new Error('인증되지 않은 사용자가 접근하려 합니다.');
      }
    } catch (error) {
      console.error('에러발생..', error);
      alert('장바구니가 비어있습니다.');
      navigate('/');
    }
  };


  return (
      <React.Fragment>
        <div className="bg-secondary border-top p-4 text-white mb-3">
          <h1 className="display-6 text-center">Shopping Cart</h1>
        </div>
        <div className="container mb-3">
          <div className="row">
            <div className="col-md-9">
              <div className="card">
                <div className="table-responsive">
                  <table className="table table-borderless">
                    <thead className="text-muted">
                    <tr className="small text-uppercase">
                      <th scope="col">Product</th>
                      <th scope="col" width={120}>
                        Quantity
                      </th>
                      <th scope="col" width={150}>
                        Price
                      </th>
                      <th scope="col" className="text-end" width={130}></th>
                    </tr>
                    </thead>
                    {itemList.map((item, idx) => {
                      return (
                          <tbody key={idx}>
                          <CartProduct
                              item={item}
                              handleDelete={handleDelete}
                              handleCountChange={handleCountChange}
                          />
                          </tbody>
                      )
                    })}
                  </table>
                </div>
                <div className="card-footer">
                  <Link to="/purchasePage" className="btn btn-primary float-end">
                    Make Purchase <IconChevronRight className="i-va" />
                  </Link>
                  <Link to="/" className="btn btn-secondary">
                    <IconChevronLeft className="i-va" /> Continue shopping
                  </Link>
                </div>
              </div>
              <div className="alert alert-success mt-3">
                <p className="m-0">
                  <IconTruck className="i-va me-2" /> Free Delivery within 1-2
                  weeks
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card mb-3">
                <div className="card-body">
                  <CouponApplyForm onSubmit={onSubmitApplyCouponCode} />
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <dl className="row border-bottom">
                    <dt className="col-6">Total price:</dt>
                    <dd className="col-6 text-end">{totalPrice}</dd>

                    <dt className="col-6 text-success">Total product:</dt>
                    <dd className="col-6 text-success text-end">{totalCount}</dd>
                    <dt className="col-6 text-success">
                      Coupon:{" "}
                      <span className="small text-muted">EXAMPLECODE</span>{" "}
                    </dt>
                    <dd className="col-6 text-success text-end">""</dd>
                  </dl>
                  <dl className="row">
                    <dt className="col-6">Total:</dt>
                    <dd className="col-6 text-end  h5">
                      <strong>{discountTotalPrice}</strong>
                    </dd>
                  </dl>
                  <hr />
                  <p className="text-center">
                    <img
                        src="../../images/payment/payments.webp"
                        alt="..."
                        height={26}
                        width={120}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-light border-top p-4">
          <div className="container">
            <h6>Payment and refund policy</h6>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </React.Fragment>
  );
};

export default CartView;
