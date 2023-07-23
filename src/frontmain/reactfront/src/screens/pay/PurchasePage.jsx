import React, {lazy, useEffect, useState} from "react";

import {ReactComponent as IconTruck} from "bootstrap-icons/icons/truck.svg";
import {useNavigate} from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import PopupDom from "./PopupDom";
import PopupPostCode from "./PopupPostCode";


const PurchaseProduct = lazy(() => import("./PurchaseProduct"));
const CouponApplyForm = lazy(() => import("../../components/others/CouponApplyForm"));

const Purchase = () => {
    const navigate = useNavigate();
    const [itemList, setItemList] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [discountTotalPrice, setDiscountTotalPrice] = useState(totalPrice);

    // 주소 입력 상태 관리
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // 팝업창 열기
    const openPostCode = () => {
        setIsPopupOpen(true);
    };

    // 팝업창 닫기
    const closePostCode = () => {
        setIsPopupOpen(false);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // 여기서 주소 입력 처리를 원하는 대로 구현합니다.
        console.log('주소 입력 값:', address);
        // 주소 입력 후에 다른 로직을 수행하거나 상태를 업데이트할 수 있습니다.
    };

    const handleDetailAddressChange = (event) => {
        setDetailAddress(event.target.value);
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
                                            <PurchaseProduct item={item}/>
                                            </tbody>
                                        );
                                    })}
                                </table>
                            </div>
                        </div>
                        <div className="alert alert-success mt-3">
                            <p className="m-0">
                                <IconTruck className="i-va me-2"/> Free Delivery within 1-2 weeks
                            </p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <dl className="row">
                                    <dt className="col-6">Total:</dt>
                                    <dd className="col-6 text-end h5">
                                        <strong>{discountTotalPrice}</strong>
                                    </dd>
                                </dl>
                                <hr/>
                                <p className="text-center">
                                    <img src="../../images/payment/payments.webp" alt="..." height={26} width={120}/>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container mb-3'
                 style={{
                     border: "20px solid #ccc", padding: 30
                     , borderRadius: 5, marginBottom: '30px'
                 }}>
                <div id='popupDom' className='container mb'>
                    {isPopupOpen && (
                        <PopupDom>
                            <PopupPostCode onClose={closePostCode} setAddress={setAddress}/>
                        </PopupDom>
                    )}
                </div>

                <InputGroup className="mb-3">
                    <Button variant="outline-secondary" id="button-addon1" onClick={openPostCode}>
                        우편번호 검색
                    </Button>
                    <Form.Control
                        aria-label="Example text with button addon"
                        aria-describedby="basic-addon1"
                        value={address}
                    />
                </InputGroup>


                <InputGroup className="mb-3">
                    <Button variant="outline-secondary" id="button-addon1" disabled
                            style={{fontWeight: 'bold', color: "black"}}>
                        상세 주소
                    </Button>
                    <Form.Control
                        placeholder="상세 주소를 입력해주세요."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        onChange={handleDetailAddressChange}
                    />
                </InputGroup>
            </div>
            <div className="container mb-3">
              <div className = "offset-md-11">
                <button>결 제</button>
              </div>
            </div>
        </React.Fragment>
    );
};

export default Purchase;
