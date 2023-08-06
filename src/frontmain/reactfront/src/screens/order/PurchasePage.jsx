import React, {lazy, useEffect, useState} from "react";

import {ReactComponent as IconTruck} from "bootstrap-icons/icons/truck.svg";
import {useNavigate} from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import PopupDom from "./PopupDom";
import PopupPostCode from "./PopupPostCode";
import axios from "../Request/RequestConfig";


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

    // 이름, 전번
    const [tel, setTel] = useState('');
    const [filterTel,setFilterTel] = useState('');
    const [userName, setUserName] = useState('');

    //const [state,setState] = useState({defaultUserName:'',defaultTel:'',defaultAddress:'',defaultDetailAddress:''});



    useEffect(() =>{
        onPurchasePage();
        return;
    },[])

    const onPurchasePage = async () => {
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
                    setTotalCount(data.totalCount); // orderName: db에서 아이템리스트 첫번째 아이템 title명 외 totalCount-1
                    setTotalPrice(data.totalPrice);

                    setUserName(data.userName);
                    setTel(data.tel);
                    setAddress(data.address);
                    setDetailAddress(data.detailAddress);

                    // setState((prevState) => ({...prevState,defaultUserName: data.userName}));
                    // setState((prevState) => ({...prevState,defaultTel: data.tel}));
                    // setState((prevState) => ({...prevState,defaultAddress: data.address}));
                    // setState((prevState) => ({...prevState,defaultDetailAddress: data.detailAddress}));


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


    //--------- 결제 정보 서버에 전송---------------------------------------

    const handlePayment = async () => {

        try {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            const userId = sessionStorage.getItem('userData2'); // 현재 로그인중인 userId
            console.log(userId);
            // itemList , totalPrice, address+''+detailAddress, tel, userName
            const orderPrice = discountTotalPrice? discountTotalPrice:totalPrice;
            const receiveAddress = address+' '+detailAddress;
            const requestData = {itemList , orderPrice, receiveAddress,userName,filterTel}
            console.log(requestData);

            const id = userId;


            if (accessToken && refreshToken) {
                const response = await axios.post(`/auth/order/save/${id}`,JSON.stringify(requestData) ,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'RefreshToken': `Bearer ${refreshToken}`,
                    },
                });

                if (response.status == 200) {
                    console.log('결제 정보 전송 완료')
                    console.log(response.data);
                    const value = response.data; // orderId
                    navigate(`/payments?or=${value}`);
                } else {
                    console.error('결제를 실패하였습니다.');
                    alert('결제를 실패하였습니다.');
                    navigate('/cart');
                }
            } else {
                console.error('인증되지 않은 사용자가 접근하려 합니다.');
                throw new Error('인증되지 않은 사용자가 접근하려 합니다.');
            }
        } catch (error) {
            console.error('에러발생..', error);
            alert('결제 실패. 잠시 후 다시 진행해 주세요.');
            navigate('/cart');
        }
    }

    // --------------------------------------------------------------------------


    const handleChangeTel = (event) => {
        const value = event.target.value;
        // 정규표현식을 사용하여 숫자인지 확인
        const regex = /^[0-9]*$/;

        if (regex.test(value) && value.length<=20) {
            setFilterTel(value);
        }
    };


    const handleChangeName = (event) => {
        setUserName(event.target.value);
    }
    return (
        <React.Fragment>
            <div className="bg-secondary border-top p-4 text-white mb-3">
                <h1 className="display-6 text-center">Purchase</h1>
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
                                        <strong>{discountTotalPrice? discountTotalPrice:totalPrice}</strong>
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
                <InputGroup className="mb-3">
                    <Button variant="outline-secondary" id="button-addon1" disabled
                            style={{fontWeight: 'bold', color: "black"}}>
                        이름
                    </Button>
                    <Form.Control
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        onChange={handleChangeName}

                        defaultValue={userName}
                    />

                    <Button variant="outline-secondary" id="button-addon1" disabled
                            style={{fontWeight: 'bold', color: "black"}}>
                        전화번호
                    </Button>
                    <Form.Control
                        placeholder="-제외, 전화번호를 입력해주세요."
                        aria-label="Phone Number"
                        aria-describedby="basic-addon2"
                        onChange={handleChangeTel}
                        value={filterTel}
                        defaultValue={tel}
                        style={{ width: "calc(30% - 50px)", marginRight: "30px" }}
                    />
                </InputGroup>


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
                        onChange={handleAddressChange}
                        defaultValue={address}
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
                        defaultValue={detailAddress}
                    />
                </InputGroup>
            </div>
            <div className="container mb-3">
              <div className = "offset-md-11">
                  <Button style={{width :'120%'}} variant="primary" onClick={handlePayment}>결 제</Button>

              </div>
            </div>
        </React.Fragment>
    );
};

export default Purchase;
