import React, {useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const CardLogin = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const userDataString = sessionStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;

    useEffect(() => {
        if (userData) {
            setIsLoggedIn(true);
            console.log(userDataString);
        }
    }, [userData]);

  return (
    <div className={`card shadow-sm ${props.className}`}>
        {isLoggedIn ? (<div className="card-body text-center">
        <h5 className="card-title">Welcome!! HJstore!</h5>
      </div>):(<div className="card-body text-center">
        <h5 className="card-title">Sign in for your best experience</h5>
        <Link to="/login" className="btn btn-warning">
            Sign in securely
        </Link>
    </div>)}
    </div>
  );
};

export default CardLogin;
