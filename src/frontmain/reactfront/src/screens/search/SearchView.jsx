import React, {lazy, useEffect, useState} from "react";
import { Link } from "react-router-dom";

import { ReactComponent as IconChevronRight } from "bootstrap-icons/icons/chevron-right.svg";
import { ReactComponent as IconChevronLeft } from "bootstrap-icons/icons/chevron-left.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import {useNavigate} from "react-router-dom";

import axios from "../Request/RequestConfig";
import SearchProducts from "./SearchProducts";


const CouponApplyForm = lazy(() =>
    import("../../components/others/CouponApplyForm")
);

const SearchView = () => {
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
            <div className="col-md-12">
              <div className="card">
                <div className="table-responsive">
                  <table className="table table-borderless">
                    <thead className="text-muted">
                    <tr className="small text-uppercase">
                      <th scope="col">title</th>
                      <th scope="col" width={120}>
                        Content
                      </th>
                      <th scope="col" width={150}>
                        by
                      </th>
                      <th scope="col" className="text-end" width={130}></th>
                    </tr>
                    </thead>
                    {itemList.map((item, idx) => {
                      return (
                          <tbody key={idx}>
                          <SearchProducts
                              item={item}
                              handleDelete={handleDelete}
                              handleCountChange={handleCountChange}
                          />
                          </tbody>
                      )
                    })}
                  </table>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="bg-light border-top p-4">

        </div>
      </React.Fragment>
  );
};

export default SearchView;
