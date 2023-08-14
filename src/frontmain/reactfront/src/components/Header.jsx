import React, {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import Search from "./Search";
import {ReactComponent as IconCart3} from "bootstrap-icons/icons/cart3.svg";
import {ReactComponent as IconPersonBadgeFill} from "bootstrap-icons/icons/person-badge-fill.svg";
import {ReactComponent as IconListCheck} from "bootstrap-icons/icons/list-check.svg";
import {ReactComponent as IconDoorClosedFill} from "bootstrap-icons/icons/door-closed-fill.svg";
import {ReactComponent as IconHeartFill} from "bootstrap-icons/icons/heart-fill.svg";
import {ReactComponent as IconBellFill} from "bootstrap-icons/icons/bell-fill.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import axios from "../screens/Request/RequestConfig";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const userDataString = sessionStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const role = sessionStorage.getItem('userRole');

    const navigate = useNavigate();
    const location = useLocation();


    // 로그아웃 상태 변경 함수
    const handleLogout = async () => {
        const id = sessionStorage.getItem('userData2');
        try {
            const response = await axios.post(`/auth/logout/${id}`);
            if (response.status === 200) {
                console.log('로그아웃 성공');
                // 로그아웃 후 원하는 동작을 수행하거나 홈 화면 등으로 이동할 수 있습니다.
                setIsLoggedIn(false);
                setUserName('');
                sessionStorage.removeItem('userData');
                sessionStorage.removeItem('userData2');
                sessionStorage.removeItem('userRole');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('kakaoAccessToken');
                localStorage.removeItem('kakaoRefreshToken');
                alert('로그아웃 성공')
                navigate('/');
            }
        } catch (error) {
            console.error('로그아웃 에러', error);
        }
    };

    const handleJoin = () => {
        navigate('/join')
    }

    useEffect(() => {
        if (userData) {
            setIsLoggedIn(true);
            setUserName(userData.username);
            console.log(role);
        }
        return;
    }, [userData]);

    return (
        <React.Fragment>
            <header className="p-3 border-bottom bg-light">
                <div className="container-fluid">
                    <div className="row g-3">
                        <div className="col-md-3 text-center">
                            <Link to="/">
                                <img
                                    src="https://image-gamja.s3.ap-northeast-2.amazonaws.com/2023-08-10+23+23+17.png"
                                    alt="BuyMeACoffee" width="120" height="40"
                                />
                            </Link>
                        </div>
                        <div className="col-md-5">
                            <Search/>
                        </div>
                        <div className="col-md-4">
                            <div className="position-relative d-inline me-3">
                                <Link to="/cart" className="btn btn-primary">
                                    <IconCart3 className="i-va"/>
                                    <div
                                        className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-circle">
                                    </div>
                                </Link>
                            </div>


                            {isLoggedIn ? (<div className="btn-group">
                                <button
                                    type="button"
                                    className="btn btn-secondary rounded-circle border me-3"
                                    data-toggle="dropdown"
                                    aria-expanded="false"
                                    aria-label="Profile"
                                    data-bs-toggle="dropdown"
                                >
                                    <FontAwesomeIcon icon={faUser} className="text-light"/>
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li>
                                        <Link className="dropdown-item" to="/account/profile">
                                            <IconPersonBadgeFill/> My Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/account/orders">
                                            <IconListCheck className="text-primary"/> Orders
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/admin/adConfig">
                                            <IconBellFill className="text-primary"/> Notification
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    {role.match('ROLE_ADMIN')?(<li>
                                        <Link className="dropdown-item" to="/admin/adConfig">
                                            <IconHeartFill className="text-primary"/> Admin Page
                                        </Link>
                                    </li>):''}
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li>
                                        <button onClick={() => handleLogout()}
                                                className="dropdown-item">
                                            <IconDoorClosedFill className="text-danger"/> Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>) : (
                                <div className="btn-group">
                                    <button
                                        type="button"
                                        className="btn btn-secondary rounded-circle border me-3"
                                        data-toggle="dropdown"
                                        aria-expanded="false"
                                        aria-label="Profile"
                                        data-bs-toggle="dropdown"
                                    >
                                        <FontAwesomeIcon icon={faUser} className="text-light"/>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link className="dropdown-item" to="/login">
                                                <IconPersonBadgeFill/> Login
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/join">
                                                <IconPersonBadgeFill className="text-primary"/> Join
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )}


                            <a
                                href="https://github.com/gamjagogi/hjStore"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://image-gamja.s3.ap-northeast-2.amazonaws.com/githubname.jpeg"
                                    alt="BuyMeACoffee" width="120" height="40"
                                />
                            </a>
                            {/* <Link to="/account/signin">Sign In</Link> |{" "}
              <Link to="/account/signup"> Sign Up</Link> */}
                        </div>
                    </div>
                </div>
            </header>
        </React.Fragment>
    );
};
export default Header;
