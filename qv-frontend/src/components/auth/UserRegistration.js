import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import './auth.css';

export default function UserRegistration() {
    //store user data in a useState variable
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();

    //set useState variables as user inputs/changes data
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const registerUser = async (userData) => {
        try {
            //call api
            const response = await axios.post("/api/auth/register", userData);
            alert("User registered successfully! Please login to access your account.");
            //navigate to login page once successfully registered
            navigate("/login");
        } catch (error) {
            //check if it's a server response with a message
            if (error.response && error.response.data) {
                console.error("Register error:", error.response.data);
                alert("Error: " + error.response.data);
            } else {
                console.error("Register error:", error.message);
                alert("Error: " + error.message);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        //compare passwords
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        //if password matches, store data in formData and pass to registerUser function
        const {username, password} = formData;
        registerUser({username, password});
    };

    return (
        <div className="user-registration">
            <div className="user-registration-msg">
                <p> </p>
            </div>

            <div className="user-reg-form">
                <h2>SIGN UP!</h2>
                <Form onSubmit={handleSubmit} data-bs-theme="dark">

                    <Form.Group className="mb-3" controlId="formGroupUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <div className="auth-btn">
                        <Button type="submit" variant="primary">Register</Button>
                    </div>

                </Form>
            </div>
        </div>
    )
}