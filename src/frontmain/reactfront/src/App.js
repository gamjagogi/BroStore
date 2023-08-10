import React, {startTransition} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import {Suspense, lazy} from "react";

//import LoginPage from './screens/Login/LoginPage.js';
//import JoinPage from './screens/Join/JoinPage';
//import ReactDoc from "./screens/pages/ReactDoc";
//import DetailPage from "./screens/userBoard/DetailPage.js";
//import PostEditor from "./screens/userBoard/PostEditor";
//import PurchasePage from "./screens/order/PurchasePage.jsx";
//import Notice from "./screens/Notice.jsx";
//import SoftwarePosting from "./screens/softwareProductPage/SoftwarePosting"
//import DeliveryPosting from "./screens/deliveryProductPage/DeliveryPosting.jsx"
//import IndexTest from "./my/IndexTest";
//import KakaoLogin from "./screens/Login/KakaoLogin"
//import SellingPage from "./screens/seller/SellingPage";
//import SellingProductFix from "./screens/seller/SellingProductFix";
//import OrderSheetForSeller from "./screens/seller/OrderSheetForSeller";
//import QuestionBoard from "./screens/question/QuestionBoard";
//import QuestionDetailPage from "./screens/question/QuestionDetailPage";
//import QuestionPost from "./screens/question/QuestionPost";
//import QuestionPostFix from "./screens/question/QuestionPostFix";
//import PostEditorFix from "./screens/userBoard/PostEditorFix";
//import SoftwarePostingFix from "./screens/softwareProductPage/SoftwarePostingFix";
//import SearchView from "./screens/search/SearchView";
//const CheckoutPage = lazy(() => import("./screens/toss/Checkout"));
//const FailPage = lazy(() => import("./screens/toss/FailPage"));
//const SuccessPage = lazy(() => import("./screens/toss/SuccessPage"));
//const IndexTest = lazy(() => import("./my/IndexTest"))
// const WishlistView = lazy(() => import("./screens/account/Wishlist"));
// const NotificationView = lazy(() => import("./screens/account/Notification"));

import NavBarElements from "./screens/Navbar/NavBarElements.js";

import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";

import "./App.min.css";

import {SuccessPage} from "./screens/toss/SuccessPage";
import {FailPage} from "./screens/toss/FailPage";
import {CheckoutPage} from "./screens/toss/Checkout";
//import NoticeEditor from "./screens/notice/NoticeEditor";
//import NoticeEditorFix from "./screens/notice/NoticeEditorFix";
//import NoticeDetailPage from "./screens/notice/NoticeDetailPage";

const NoticeEditor = lazy(() => import("./screens/notice/NoticeEditor"));
const NoticeEditorFix = lazy(() => import("./screens/notice/NoticeEditorFix"));
const NoticeDetailPage = lazy(() => import("./screens/notice/NoticeDetailPage"));
const Notice = lazy(() => import("./screens/notice/Notice.jsx"));
const ReactDoc = lazy(() => import("./screens/pages/ReactDoc"));

const KakaoLogin = lazy(() => import("./screens/Login/KakaoLogin"));

const SellingPage = lazy(() => import("./screens/seller/SellingPage"));
const SellingProductFix = lazy(() => import("./screens/seller/SellingProductFix"));

// 유저 게시판 관련 기능
const PostEditor = lazy(() => import("./screens/userBoard/PostEditor"));
const DetailPage = lazy(() => import("./screens/userBoard/DetailPage.js"));


const QuestionBoard = lazy(() => import("./screens/question/QuestionBoard"));
const QuestionDetailPage = lazy(() => import("./screens/question/QuestionDetailPage"));
const QuestionPost = lazy(() => import("./screens/question/QuestionPost"));
const QuestionPostFix = lazy(() => import("./screens/question/QuestionPostFix"));
//검색
const SearchView = lazy(() => import("./screens/search/SearchView"));

const PostingFix = lazy(() => import("./screens/softwareProductPage/SoftwarePostingFix")); //수정페이지
const SoftwarePosting = lazy(() => import("./screens/softwareProductPage/SoftwarePosting"));
const SoftwareListView = lazy(() => import("./screens/softwareProductPage/SoftwareList"));
const SoftwareDetailView = lazy(() => import("./screens/softwareProductPage/SoftwareDetail"));
const StarZoneView = lazy(() => import("./screens/softwareProductPage/StarZone"));

const DeliveryPosting = lazy(() => import("./screens/deliveryProductPage/DeliveryPosting.jsx"));
const DeliveryListView = lazy(() => import("./screens/deliveryProductPage/DeliveryList"))
const DeliveryDetailView = lazy(() => import("./screens/deliveryProductPage/DeliveryDetail"))
const DeliveryStarZoneView = lazy(() => import("./screens/deliveryProductPage/DeliveryStarZone"))

const MyPage = lazy(() => import("./screens/myPage/MyPage"));

const Home = lazy(() => import("./screens/Home"));
const CartView = lazy(() => import("./screens/cart/Cart"));

const SupportView = lazy(() => import("./screens/pages/Support"));
const Documentation = lazy(() => import("./screens/Documentation"));
const NotFoundView = lazy(() => import("./screens/pages/404"));
const InternalServerErrorView = lazy(() => import("./screens/pages/500"));
const ContactUsView = lazy(() => import("./screens/pages/ContactUs"));
const UserBoard = lazy(() => import("./screens/userBoard/UserBoard"));
const PostEditorFix = lazy(() => import("./screens/userBoard/PostEditorFix"))

const OrderSheetForSeller = lazy(() => import("./screens/seller/OrderSheetForSeller"));
const OrderSheet = lazy(() => import("./screens/order/OrderSheet"));
const PurchasePage = lazy(() => import("./screens/order/PurchasePage.jsx"));


const LoginPage = lazy(() => import('./screens/Login/LoginPage.js'));
const JoinPage = lazy(() => import('./screens/Join/JoinPage'));
const ForgotPasswordView = lazy(() => import("./screens/account/ForgotPassword"));




function App() {
    return (
        <Router>
            <React.Fragment>

                <Header/>
                <NavBarElements/>
                <Suspense
                    fallback={
                        <div className="text-white text-center mt-3">Loading...</div>
                    }
                >
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route
                            exact
                            path="/account/forgotpassword"
                            element={<ForgotPasswordView/>}
                        />


                        <Route exact path="/join" element={<JoinPage/>}/>
                        <Route exact path="/account/profile" element={<MyPage/>}/>
                        <Route exact path="/account/orders" element={<OrderSheet/>}/>

                        <Route exact path="/login" element={<LoginPage/>}/>
                        <Route exact path ="/auth" element={<KakaoLogin/>}/>

                        <Route exact path="/board" element={<UserBoard/>}/>
                        <Route exact path="/detail/:id" element={<DetailPage/>}/>
                        <Route exact path="/editor" element={<PostEditor/>}/>
                        <Route exact path="/board/editor/:id" element={<PostEditorFix/>}/>


                        <Route exact path="/question" element={<QuestionBoard/>}/>
                        <Route exact path="/question/detail/:id" element={<QuestionDetailPage/>}/>
                        <Route exact path="/question/editor" element={<QuestionPost/>}/>
                        <Route exact path="/question/editor/:userId" element={<QuestionPostFix/>}/>


                        <Route exact path="/software" element={<SoftwareListView/>}/>
                        <Route exact path="/software/:id" element={<SoftwareDetailView/>}/>
                        <Route exact path="/software/boardFix" element={<PostingFix/>}/>


                        <Route exact path = "/delivery" element={<DeliveryListView/>}/>
                        <Route exact path="/cart" element={<CartView/>}/>
                        <Route exact path="/reactDoc" element={<ReactDoc/>}/>

                        <Route exact path="/star/zone" element={<StarZoneView/>}/>
                        <Route exact path="/500" element={<InternalServerErrorView/>}/>
                        <Route path="*" element={<NotFoundView/>}/>
                        <Route exact path="/contact-us" element={<ContactUsView/>}/>
                        <Route exact path="/support" element={<SupportView/>}/>
                        <Route exact path="/posting" element={<SoftwarePosting/>}/>

                        <Route exact path="/deliveryPosting" element={<DeliveryPosting/>}/>
                        <Route exact path="/delivery/:id" element={<DeliveryDetailView/>}/>
                        <Route exact path="/deliveryStar/zone" element={<DeliveryStarZoneView/>}/>

                        <Route exact path = "/purchasePage" element={<PurchasePage/>}/>

                        < Route exact path = "/payments" element={<CheckoutPage/>}/>
                        < Route exact path = "/success" element={<SuccessPage/>}/>
                        < Route exact path = "/fail" element={<FailPage/>}/>

                        <Route exact path="/selling" element={<SellingPage/>}/>
                        <Route exact path="/selling/:id" element={<SellingProductFix/>}/>
                        <Route exact path="/selling/orders" element={<OrderSheetForSeller/>}/>

                        <Route exact path="/search" element={<SearchView/>}/>

                        <Route exact path="/notice" element={<Notice/>}/>
                        <Route exact path="/noticeEditor" element={<NoticeEditor/>}/>
                        <Route exact path="/notice/editor/:id" element={<NoticeEditorFix/>}/>
                        <Route exact path="/notice/:id" element={<NoticeDetailPage/>}/>


                        <Route exact path="/document" element={<Documentation/>}/>

                    </Routes>
                </Suspense>
                <Footer/>
            </React.Fragment>
        </Router>
    );
};

export default App;
