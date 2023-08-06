import React, {startTransition} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import LoginPage from './screens/Login/LoginPage.js';
import JoinPage from './screens/Join/JoinPage';
import {Suspense, lazy} from "react";
import About from "./screens/pages/About"
import ReactDoc from "./screens/pages/ReactDoc";
import NavBarElements from "./screens/Navbar/NavBarElements.js";
import DetailPage from "./screens/userBoard/DetailPage.js";
import PostEditor from "./screens/userBoard/PostEditor";

import Notice from "./screens/Notice.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";

import SoftwarePosting from "./screens/softwareProductPage/Posting"
import DeliveryPosting from "./screens/deliveryProductPage/DeliveryPosting.jsx"
import "./App.min.css";
import PurchasePage from "./screens/order/PurchasePage.jsx";
import {SuccessPage} from "./screens/toss/SuccessPage";
import {FailPage} from "./screens/toss/FailPage";
import {CheckoutPage} from "./screens/toss/Checkout";

import IndexTest from "./my/IndexTest";
import KakaoLogin from "./screens/Login/KakaoLogin"
import SellingPage from "./screens/seller/SellingPage";
import SellingProductFix from "./screens/seller/SellingProductFix";
import OrderSheetForSeller from "./screens/seller/OrderSheetForSeller";
import QuestionBoard from "./screens/question/QuestionBoard";
import QuestionDetailPage from "./screens/question/QuestionDetailPage";
import QuestionPost from "./screens/question/QuestionPost";
import QuestionPostFix from "./screens/question/QuestionPostFix";
import PostEditorFix from "./screens/userBoard/PostEditorFix";
import PostingFix from "./screens/softwareProductPage/PostingFix";
import SearchView from "./screens/search/SearchView";

const SoftwareListView = lazy(() => import("./screens/softwareProductPage/List"));
const SoftwareDetailView = lazy(() => import("./screens/softwareProductPage/Detail"));
const StarZoneView = lazy(() => import("./screens/softwareProductPage/StarZone"));

const DeliveryListView = lazy(() => import("./screens/deliveryProductPage/DeliveryList"))
const DeliveryDetailView = lazy(() => import("./screens/deliveryProductPage/DeliveryDetail"))
const DeliveryStarZoneView = lazy(() => import("./screens/deliveryProductPage/DeliveryStarZone"))

const MyPage = lazy(() => import("./screens/myPage/MyPage"));

const Home = lazy(() => import("./screens/Home"));
const CartView = lazy(() => import("./screens/cart/Cart"));

const SupportView = lazy(() => import("./screens/pages/Support"));

const NotFoundView = lazy(() => import("./screens/pages/404"));
const InternalServerErrorView = lazy(() => import("./screens/pages/500"));
const ContactUsView = lazy(() => import("./screens/pages/ContactUs"));
const UserBoard = lazy(() => import("./screens/userBoard/UserBoard"));

const OrderSheet = lazy(() => import("./screens/order/OrderSheet"));

const ForgotPasswordView = lazy(() => import("./screens/account/ForgotPassword"));
const WishlistView = lazy(() => import("./screens/account/Wishlist"));
const NotificationView = lazy(() => import("./screens/account/Notification"));
const MyProfileView = lazy(() => import("./screens/account/MyProfile"));
//const OrdersView = lazy(() => import("./screens/account/Orders"));

function App() {
    return (
        <Router>
            <React.Fragment>
                <Routes>
                <Route exact path= "/my" element={<IndexTest/>}/>
                </Routes>

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
                        <Route exact path="/account/wishlist" element={<WishlistView/>}/>
                        <Route
                            exact
                            path="/account/notification"
                            element={<NotificationView/>}
                        />
                        <Route exact path="/login" element={<LoginPage/>}/>
                        <Route exact path ="/auth" element={<KakaoLogin/>}/>
                        <Route exact path="/about" element={<About/>}/>

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

                        <Route exact path="/notice" element={<Notice/>}/>

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


                    </Routes>
                </Suspense>
                <Footer/>
            </React.Fragment>
        </Router>
    );
};

export default App;
