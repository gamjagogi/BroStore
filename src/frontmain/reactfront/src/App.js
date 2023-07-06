import React, { startTransition } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import JoinPage from './components/Join/JoinPage';
import { Suspense, lazy } from "react";
import About from "./screens/About"
import Software from "./screens/Software";
import Questions from "./screens/Questions";
import ReactDoc from "./screens/ReactDoc";
import NavBarElements from "./components/Navbar/NavBarElements";
import DetailPage from "./components/Board/DetailPage";
import PostEditor from "./components/Board/PostEditor";
import Notice from "./screens/Notice";


const Home = lazy(() => import("./screens/Home"));
const CartView = lazy(() => import("./screens/cart/Cart"));

function App() {
    return (
        <Router>
            <NavBarElements/>
            <Routes>
                <Route exact path="/login" element={<LoginPage />} />
                <Route exact path="/" element={<Home /> } />
                <Route exact path="/about" element={<About/> } />
                <Route exact path="/software" element={<Software/> } />

                <Route exact path="/cart" element={<CartView/>} />
                <Route exact path="/questions" element={<Questions/> } />
                <Route exact path="/reactDoc" element={<ReactDoc/> } />
                <Route exact path="/join" element={<JoinPage />} />
                <Route exact path="/detail/:id" element={<DetailPage />} />
                <Route exact path="/editor" element={<PostEditor/>}/>
                <Route exact path = "/notice" element={<Notice/>}/>
            </Routes>
        </Router>
    );
};

export default App;
