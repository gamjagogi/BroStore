import React, {useState, useEffect} from 'react';
import {Form, Button, Alert, Container, Card, InputGroup} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import axios from '../Request/RequestConfig.js';
import PopupDom from "../order/PopupDom";
import PopupPostCode from "../order/PopupPostCode";

const MyPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [birth, setBirth] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [loginError, setLoginError] = useState('');
    const [tel, setTel] = useState('');
    const [filterTel,setFilterTel] = useState('');

    const [editName, setEditName] = useState(false);
    const [editBirth, setEditBirth] = useState(false);

    const [editAddress,setEditAddress] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [editTel, setEditTel] = useState(false);

    const id = sessionStorage.getItem('userData2');

    useEffect(() => {
        getMyProfile();
        return;
    }, []);


    const getMyProfile = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');

            if (accessToken && refreshToken) {
                const response = await axios.get(`/auth/user/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'RefreshToken': `Bearer ${refreshToken}`,
                    },
                });
                if (response.status === 200) {
                    const data = response.data.data;
                    console.log(data);
                    setEmail(data.email);
                    setBirth(data.birth);
                    setUsername(data.username);
                    setTel(data.tel);
                    setAddress(data.address);
                    setDetailAddress(data.detailAddress);
                } else {
                    const errorMessages = await response.data;
                    console.log(errorMessages.errors);
                    const errors = errorMessages.errors;
                    for (const error of errors) {
                        console.log(error.defaultMessage);
                        alert(error.defaultMessage);
                    }
                }
            } else {
                setLoginError('인증 권한을 가진 유저만 접근 가능합니다.');
            }
        } catch (error) {
            console.error(error);
        }
    }


    const handleEditName = async () => {
        if (editName == true) {
            console.log('저장 눌릴때 실행되는 로직.');
            try {
                const accessToken = localStorage.getItem('accessToken');
                const refreshToken = localStorage.getItem('refreshToken');

                const requestData = {'username': username};

                if (accessToken && refreshToken) {
                    const response = await axios.post(`/auth/user/update/name/${id}`, JSON.stringify(requestData), {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                            'RefreshToken': `Bearer ${refreshToken}`,
                        },
                    });

                    if (response.status == 200) {
                        alert('변경 완료');
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
                } else {
                    setLoginError('인증 권한을 가진 유저만 접근 가능합니다.'); // 로그인되지 않은 경우 처리
                }
            } catch (error) {
                console.error('인증되지 않은 사용자가 접근하려 합니다..', error);
                setLoginError('인증된 유저만 접근 가능합니다.');
            }
        }
        setEditName(!editName); // 수정 모드 상태를 토글합니다.
    };

    const handleEditBirth = async () => {
        if (editBirth == true) {
            console.log('저장 눌릴때 실행되는 로직.');
            try {
                const accessToken = localStorage.getItem('accessToken');
                const refreshToken = localStorage.getItem('refreshToken');

                const requestData = {'birth': birth};

                if (accessToken && refreshToken) {
                    const response = await axios.post(`/auth/user/update/birth/${id}`, JSON.stringify(requestData), {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                            'RefreshToken': `Bearer ${refreshToken}`,
                        },
                    });

                    if (response.status == 200) {
                        alert('변경 완료');
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
                } else {
                    setLoginError('인증 권한을 가진 유저만 접근 가능합니다.'); // 로그인되지 않은 경우 처리
                }
            } catch (error) {
                console.error('인증되지 않은 사용자가 접근하려 합니다..', error);
                setLoginError('인증된 유저만 접근 가능합니다.');
            }
        }
        setEditBirth(!editBirth); // 수정 모드 상태를 토글합니다.
    };


    const handleEditAddress = async () => {
        if (editAddress == true) {
            console.log('저장 눌릴때 실행되는 로직.');
            try {
                const accessToken = localStorage.getItem('accessToken');
                const refreshToken = localStorage.getItem('refreshToken');

                const requestData = {'address': address,'detailAddress': detailAddress};

                if (accessToken && refreshToken) {
                    const response = await axios.post(`/auth/user/update/address/${id}`, JSON.stringify(requestData), {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                            'RefreshToken': `Bearer ${refreshToken}`,
                        },
                    });

                    if (response.status == 200) {
                        alert('변경 완료');
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
                } else {
                    setLoginError('인증 권한을 가진 유저만 접근 가능합니다.'); // 로그인되지 않은 경우 처리
                }
            } catch (error) {
                console.error('인증되지 않은 사용자가 접근하려 합니다..', error);
                setLoginError('인증된 유저만 접근 가능합니다.');
            }
        }
        setEditAddress(!editAddress); // 수정 모드 상태를 토글합니다.
    };


    const handleEditTel = async () => {
        if (editTel == true) {
            console.log('저장 눌릴때 실행되는 로직.');
            try {
                const accessToken = localStorage.getItem('accessToken');
                const refreshToken = localStorage.getItem('refreshToken');

                const requestData = {'tel': filterTel};

                if (accessToken && refreshToken) {
                    const response = await axios.post(`/auth/user/update/tel/${id}`, JSON.stringify(requestData), {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                            'RefreshToken': `Bearer ${refreshToken}`,
                        },
                    });

                    if (response.status == 200) {
                        alert('변경 완료');
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
                } else {
                    setLoginError('인증 권한을 가진 유저만 접근 가능합니다.'); // 로그인되지 않은 경우 처리
                }
            } catch (error) {
                console.error('인증되지 않은 사용자가 접근하려 합니다..', error);
                setLoginError('인증된 유저만 접근 가능합니다.');
            }
        }
        setEditTel(!editTel); // 수정 모드 상태를 토글합니다.
    };


    const handleDetailAddressChange = (event) => {
        setDetailAddress(event.target.value);
    };
    // 팝업창 열기
    const openPostCode = () => {
        setIsPopupOpen(true);
    };

    // 팝업창 닫기
    const closePostCode = () => {
        setIsPopupOpen(false);
    };


    const onChangeTel = (event) => {
        const value = event.target.value;
        // 정규표현식을 사용하여 숫자인지 확인
        const regex = /^[0-9]*$/;

        if (regex.test(value) && value.length<=20) {
            setFilterTel(value);
        }
    }

    return (
        <div style={{
            minHeight: '50vh',
            marginTop: '50px',
            marginRight: '90px',
            marginLeft: '90px',
            marginBottom: '50px'
        }}>
            <Container fluid>
                <Card border="primary">
                    <h1>내 정보</h1>
                    <span style={{fontSize:'80%', color:'red'}}>정보변경시, 한개씩 변경 부탁드립니다.</span>
                    <Form controlId="forBasicEmail" className="col-6 align-self-center" style={{marginBottom: '30px',marginTop:'10px'}}>
                        <Form.Label>Email 주소</Form.Label>
                        <Form.Control
                            type="email"
                            defaultValue={email}
                            disabled
                        />
                    </Form>
                    <Form controlId="formBasicPassword" className="col-6 align-self-center"
                          style={{marginBottom: '30px'}}>
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="**********"
                            disabled
                        />
                    </Form>

                    <Form controlId="formBasicName" className="col-6 align-self-center" style={{marginBottom: '30px'}}>
                        <Form.Label>이름 (닉네임)</Form.Label>
                        {editName ? ( // 수정 모드이면 input 태그를 렌더링합니다.
                            <Form.Control
                                type="text"
                                placeholder="이름"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        ) : ( // 수정 모드가 아니면 일반 텍스트 형태로 렌더링합니다.
                            <Form.Control placeholder={username} plaintext readOnly defaultValue={username}
                                          style={{border: '1px solid #ced4da'}}/>
                        )}
                        <Button variant="primary" onClick={handleEditName} style={{ backgroundColor: editName ? 'red' : 'primary' }}>
                            {editName ? '저장' : '수정'} {/* 수정 모드에 따라 버튼의 레이블을 변경합니다. */}
                        </Button>
                    </Form>


                    <Form controlId="formBasicBirth" className="col-6 align-self-center" style={{marginBottom: '30px'}}>
                        <Form.Label>생년월일</Form.Label>
                        {editBirth ? ( // 수정 모드이면 input 태그를 렌더링합니다.
                            <Form.Control
                                type="date"
                                placeholder="생년월일"
                                defaultValue={birth}
                                onChange={(e) => setBirth(e.target.value)}
                            />
                        ) : ( // 수정 모드가 아니면 일반 텍스트 형태로 렌더링합니다.
                            <Form.Control placeholder={birth} plaintext readOnly defaultValue={birth}
                                          style={{border: '1px solid #ced4da'}}/>
                        )}
                        <Button variant="primary" onClick={handleEditBirth} style={{ backgroundColor: editBirth ? 'red' : 'primary' }}>
                            {editBirth ? '저장' : '수정'} {/* 수정 모드에 따라 버튼의 레이블을 변경합니다. */}
                        </Button>
                    </Form>



                    <Form controlId="formBasicAddress" className="col-6 align-self-center" style={{marginBottom:'30px'}}>
                        <Form.Label>주소</Form.Label>
                        {editAddress ? ( // 수정 모드이면 input 태그를 렌더링합니다.
                            <Form>
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
                                        onChange={(e) => setAddress(e.target.value)}
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
                                        defaultValue={detailAddress}
                                    />
                                </InputGroup>
                            </Form>
                        ) : ( // 수정 모드가 아니면 일반 텍스트 형태로 렌더링합니다.
                            <Form>
                            <Form.Control placeholder={address} plaintext readOnly defaultValue={address} style={{ border: '1px solid #ced4da' }}  />
                            <Form.Control placeholder={detailAddress} plaintext readOnly defaultValue={detailAddress} style={{ border: '1px solid #ced4da' }}  />
                            </Form>
                        )}

                        <Button variant="primary" onClick={handleEditAddress} style={{ backgroundColor: editAddress ? 'red' : 'primary' }}>
                            {editAddress ? '저장' : '수정'} {/* 수정 모드에 따라 버튼의 레이블을 변경합니다. */}
                        </Button>
                    </Form>


                    <Form controlId="formBasicTel" className="col-6 align-self-center" style={{marginBottom:'30px'}}>
                        <Form.Label>전화번호</Form.Label>
                        {editTel ? ( // 수정 모드이면 input 태그를 렌더링합니다.
                            <Form.Control
                                type="tel"
                                placeholder="010xxxxxxxx"
                                defaultValue={tel}
                                value={filterTel}
                                onChange={(e) => onChangeTel(e)}
                            />
                        ) : ( // 수정 모드가 아니면 일반 텍스트 형태로 렌더링합니다.
                            <Form.Control placeholder={tel} plaintext readOnly defaultValue={tel} style={{ border: '1px solid #ced4da' }}  />
                        )}
                        <Button variant="primary" onClick={handleEditTel} style={{ backgroundColor: editTel ? 'red' : 'primary' }}>
                            {editTel ? '저장' : '수정'} {/* 수정 모드에 따라 버튼의 레이블을 변경합니다. */}
                        </Button>
                    </Form>
                </Card>
            </Container>
        </div>
    );
};

export default MyPage;
