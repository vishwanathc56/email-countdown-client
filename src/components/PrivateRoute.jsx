import React from "react";
import { Navigate } from "react-router-dom";

/* const PrivateRoute = ({ children }) => {
    const isLoggedIn = !!localStorage.getItem("userdata");
    return isLoggedIn ? children : <Navigate to="/login" />;
}; */

const PrivateRoute = ({ children }) => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    console.log("PrivateRoute check", { email, token });

    if (!email || !token) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;
