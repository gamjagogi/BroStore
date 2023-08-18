import React, {lazy, useEffect, useState} from "react";
import { Link } from "react-router-dom";

import { ReactComponent as IconChevronRight } from "bootstrap-icons/icons/chevron-right.svg";
import { ReactComponent as IconChevronLeft } from "bootstrap-icons/icons/chevron-left.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import {useNavigate} from "react-router-dom";

import axios from "../Request/RequestConfig";


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

  useEffect(() => {
    onCartPage();
  }, []);




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
                      <th scope="col"width={150}>Product</th>
                      <th scope="col" width={70}>
                        Quantity
                      </th>
                      <th scope="col" width={70}>
                        Price
                      </th>
                      <th scope="col" className="text-end" width={50}></th>
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
                  <Link to="/purchasePage" className="btn btn-primary float-end btn-xs">
                    Make Purchase <IconChevronRight className="i-va" />
                  </Link>
                  <Link to="/" className="btn btn-secondary btn-xs">
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
                      <strong>{discountTotalPrice? discountTotalPrice:totalPrice}</strong>
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
              대금 결제 및 정산 방식 관련 전자금융거래법, 여신전문금융업법, 외국환거래법 등 규제의 준수(특히, 판매법인과 쇼핑몰운영법인이 다른 경우나 해외법인이 관련되어 있는 경우, 전자금융업 license 및/또는 외국환업무 license 필요 여부를 포함하여 보다 면밀한 검토가 필요함)
              제3자의 결제서비스(전자지급결제대행, 에스크로, 통신과금 등)를 이용하는 경우 제3자의 license 구비 여부 및 관련 규제 준수 여부 등 검토
              포인트 등을 지급하는 경우, 선불전자지급수단 license 필요 여부 등 검토
            </p>
            <p>
              온라인 쇼핑몰 회원가입 및 고객안내 등 과정에서 개인정보를 수집·이용하거나 수집된 개인정보를 제3자에 제공 또는 처리위탁하는 업무, 고객에 대한 광고성 정보 전송, 휴면고객 정보 관리 등을 처리하는 과정에서 통상적으로 다음의 규제 준수 여부가 문제가 됩니다.

              개인정보 수집·이용, 제공, 위탁 등에 필요한 고지 및 동의취득 준수 여부(선택동의·필수동의 항목의 구분 포함)
              행태정보1 처리 및 온라인 맞춤형 광고 관련 유의사항
              광고성 정보 전송 시 준수하여야 하는 절차 점검
              개인정보 처리방침 및 이용약관 고지
              장기 미이용 고객의 개인정보 분리보관 내지 파기 의무 준수여부
              매출액 및 이용자 규모에 따라 정보보호관리체계(ISMS) 인증 필요 여부 검토
              정보보호최고책임자(CISO) 및 개인정보보호책임자(CPO) 자격요건 검토 및 지정∙신고
            </p>
          </div>
        </div>
      </React.Fragment>
  );
};

export default CartView;
