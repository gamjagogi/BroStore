import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import JoinPage from './components/Join/JoinPage';
import Home from "./screens/Home"
import About from "./screens/About"
import Shop from "./screens/Shop";
import Questions from "./screens/Questions";
import ReactDoc from "./screens/ReactDoc";
import NavBarElements from "./components/Navbar/NavBarElements";
import DetailPage from "./components/Detail/DetailPage";
import Editor from "./components/Board/Editor";

const App = () => {
    return (
        <Router>
            <NavBarElements/>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Home /> } />
                <Route path="/about" element={<About/> } />
                <Route path="/shop" element={<Shop/> } />
                <Route path="/questions" element={<Questions/> } />
                <Route path="/reactDoc" element={<ReactDoc/> } />
                <Route path="/join" element={<JoinPage />} />
                <Route path="/detail" element={<DetailPage />} />
                <Route path="/editor" element={<Editor/>}/>
            </Routes>
        </Router>
    );
};

export default App;
