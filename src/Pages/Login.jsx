// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            //const res = await fetch('/api/login', {
            const res = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                }
            );

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('email', data.email);
                localStorage.setItem('token', data.token);
                navigate('/countdown');
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (err) {
            alert('Server error');
            console.error(err);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h2>Login to Email Countdown Generator</h2>
            <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: "10px", fontSize: "16px", marginRight: "10px" }}
            />
            <button onClick={handleLogin} style={{ padding: "10px 20px" }}>
                Login
            </button>
        </div>
    );
};

export default Login;
