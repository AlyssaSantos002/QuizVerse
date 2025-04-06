import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import './auth.css';


export default function Login({ setIsLoggedIn, setUserData }) {
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
            const res = await axios.post("/api/auth/login", loginData, {
                withCredentials: true,
            });

            const { id, username, role } = res.data;

            //store user info
            setUserData({ id, username, role });
            localStorage.setItem("userData", JSON.stringify({ id, username, role }));
            setIsLoggedIn(true);
            localStorage.setItem("isLoggedIn", "true");

            navigate("/dashboard");

        } catch (err) {
            console.error("Login failed:", err);
            alert("Invalid credentials!");
        }
    };

    return (
        <div className="login-container">
            <div className="login-msg">
                <p> </p>
            </div>
            <div className="login-form">
                <Form onSubmit={handleSubmit} data-bs-theme="dark">
                    <h2>LOGIN</h2>
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
                    <div className="d-grid gap-2">
                        <Button type="submit" variant="primary" className="mt-3">Login</Button>
                    </div>
                    <div className="link">
                        <p>Don't have an account? Create one <Link to="/register">here!</Link></p>
                    </div>
                </Form>
            </div>
        </div>
    );
}