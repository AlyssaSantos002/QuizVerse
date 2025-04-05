import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './auth.css';


export default function Login({ setIsLoggedIn }) {
    //store user login details in a useState variable
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/auth/login", loginData, {
                withCredentials: true,
            });

            console.log("Login success:", response.data);
            setIsLoggedIn(true);
            localStorage.setItem("isLoggedIn", "true");
            navigate("/user-dashboard");
        } catch (err) {
            console.error("Login failed:", err.response?.data || err.message);
            alert("Login failed: " + (err.response?.data || err.message));
        }
    };

    return (
        <div className="auth-form">
            <h2>LOGIN</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={loginData.username}
                        onChange={handleChange}
                        placeholder="Enter username"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                </Form.Group>
                <div className="auth-btn">
                    <Button type="submit" variant="primary">Login</Button>
                </div>
            </Form>
        </div>
    );
}