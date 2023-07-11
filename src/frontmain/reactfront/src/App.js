import React, {startTransition} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './screens/Login/LoginPage';
import JoinPage from './screens/Join/JoinPage';
import {Suspense, lazy} from "react";
import About from "./screens/About"
import Questions from "./screens/Questions";
import ReactDoc from "./screens/ReactDoc";
import NavBarElements from "./screens/Navbar/NavBarElements";
import DetailPage from "./screens/Board/DetailPage";
import PostEditor from "./screens/Board/PostEditor";
import Notice from "./screens/Notice";
import Footer from "./components/Footer";
import Header from "./components/Header";


const Home = lazy(() => import("./screens/Home"));
const CartView = lazy(() => import("./screens/cart/Cart"));
const ProductListView = lazy(() => import("./screens/product/List"));

const BlogView = lazy(() => import("./screens/blog/Blog"));
const BlogDetailView = lazy(() => import("./screens/blog/Detail"));
const SupportView = lazy(() => import("./screens/pages/Support"));

const ProductDetailView = lazy(() => import("./screens/product/Detail"));
const StarZoneView = lazy(() => import("./screens/product/StarZone"));

const NotFoundView = lazy(() => import("./screens/pages/404"));
const InternalServerErrorView = lazy(() => import("./screens/pages/500"));
const ContactUsView = lazy(() => import("./screens/pages/ContactUs"));
const List = lazy(() => import("./screens/product/List"));
const UserBoard = lazy(() => import("./screens/Board/UserBoard"));


function App() {
    return (
        <Router>
            <React.Fragment>
                <Header/>
                <Suspense
                    fallback={
                        <div className="text-white text-center mt-3">Loading...</div>
                    }
                >
                    <NavBarElements/>
                    <Routes>
                        <Route exact path="/category" element={<ProductListView/>}/>
                        <Route exact path="/login" element={<LoginPage/>}/>
                        <Route exact path="/" element={<Home/>}/>
                        <Route exact path="/about" element={<About/>}/>
                        <Route exact path="/board" element={<UserBoard/>}/>
                        <Route exact path="/software" element={<List/>}/>
                        <Route exact path="/cart" element={<CartView/>}/>
                        <Route exact path="/questions" element={<Questions/>}/>
                        <Route exact path="/reactDoc" element={<ReactDoc/>}/>
                        <Route exact path="/join" element={<JoinPage/>}/>
                        <Route exact path="/detail/:id" element={<DetailPage/>}/>
                        <Route exact path="/editor" element={<PostEditor/>}/>
                        <Route exact path="/notice" element={<Notice/>}/>
                        <Route exact path="/blog" element={<BlogView/>}/>
                        <Route exact path="/blog/detail" element={<BlogDetailView/>}/>
                        <Route exact path="/software/:id" element={<ProductDetailView/>}/>
                        <Route exact path="/star/zone" element={<StarZoneView/>}/>
                        <Route exact path="/500" element={<InternalServerErrorView/>}/>
                        <Route path="*" element={<NotFoundView/>}/>
                        <Route exact path="/contact-us" element={<ContactUsView/>}/>
                        <Route exact path="/support" element={<SupportView/>}/>

                    </Routes>
                </Suspense>
                <Footer/>
            </React.Fragment>
        </Router>


    );
};

export default App;
