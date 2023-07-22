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

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const userDataString = sessionStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;

    const navigate = useNavigate();
    const location = useLocation();


    // 로그인 상태 변경 함수
    const handleLogin = () => {
        navigate('/login');
    };

    // 로그아웃 상태 변경 함수
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserName('');
        sessionStorage.removeItem('userData');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        alert('로그아웃 성공')
    };

    const handleJoin = () => {
        navigate('/join')
    }

    useEffect(() => {
        if (userData) {
            setIsLoggedIn(true);
            setUserName(userData.username);

        }
    }, [userData]);

    return (
        <React.Fragment>
            <header className="p-3 border-bottom bg-light">
                <div className="container-fluid">
                    <div className="row g-3">
                        <div className="col-md-3 text-center">
                            <Link to="/">
                                <img
                                    alt="logo"
                                    src="../../images/logo.webp"
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
                                        <Link className="dropdown-item" to="/account/wishlist">
                                            <IconHeartFill className="text-danger"/> Wishlist
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/account/notification">
                                            <IconBellFill className="text-primary"/> Notification
                                        </Link>
                                    </li>
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
                                href="https://www.buymeacoffee.com/bhaumik"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                                    alt="BuyMeACoffee" width="120"
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
