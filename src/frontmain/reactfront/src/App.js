import React, {startTransition} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import LoginPage from './screens/Login/LoginPage';
import JoinPage from './screens/Join/JoinPage';
import {Suspense, lazy} from "react";
import About from "./screens/pages/About"
import Questions from "./screens/pages/Questions";
import ReactDoc from "./screens/pages/ReactDoc";
import NavBarElements from "./screens/Navbar/NavBarElements";
import DetailPage from "./screens/userBoard/DetailPage";
import PostEditor from "./screens/userBoard/PostEditor";

import Notice from "./screens/Notice";
import Footer from "./components/Footer";
import Header from "./components/Header";

import SoftwarePosting from "./screens/softwareProductPage/Posting"
import DeliveryPosting from "./screens/deliveryProductPage/DeliveryPosting"
import "./App.min.css";
import PurchasePage from "./screens/order/PurchasePage";
import {SuccessPage} from "./screens/toss/SuccessPage";
import {FailPage} from "./screens/toss/FailPage";
import {CheckoutPage} from "./screens/toss/Checkout";

import IndexTest from "./my/IndexTest";
import KakaoLogin from "./screens/Login/KakaoLogin"

const SoftwareListView = lazy(() => import("./screens/softwareProductPage/List"));
const SoftwareDetailView = lazy(() => import("./screens/softwareProductPage/Detail"));
const StarZoneView = lazy(() => import("./screens/softwareProductPage/StarZone"));

const DeliveryListView = lazy(() => import("./screens/deliveryProductPage/DeliveryList"))
const DeliveryDetailView = lazy(() => import("./screens/deliveryProductPage/DeliveryDetail"))
const DeliveryStarZoneView = lazy(() => import("./screens/deliveryProductPage/DeliveryStarZone"))


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
                        <Route exact path="/account/profile" element={<MyProfileView/>}/>
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
                        <Route exact path="/software" element={<SoftwareListView/>}/>
                        <Route exact path = "/delivery" element={<DeliveryListView/>}/>

                        <Route exact path="/cart" element={<CartView/>}/>
                        <Route exact path="/questions" element={<Questions/>}/>
                        <Route exact path="/reactDoc" element={<ReactDoc/>}/>
                        <Route exact path="/join" element={<JoinPage/>}/>
                        <Route exact path="/detail/:id" element={<DetailPage/>}/>
                        <Route exact path="/editor" element={<PostEditor/>}/>
                        <Route exact path="/notice" element={<Notice/>}/>
                        <Route exact path="/software/:id" element={<SoftwareDetailView/>}/>
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


                    </Routes>
                </Suspense>
                <Footer/>
            </React.Fragment>
        </Router>
    );
};

export default App;
