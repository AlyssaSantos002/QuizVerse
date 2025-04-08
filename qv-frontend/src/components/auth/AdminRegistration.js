import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {useState} from "react";
import './auth.css';
import {Link, useNavigate} from "react-router-dom";
import ProfileSetup from "./ProfileSetup";

export default function AdminRegistration(){
    //store userData in useState variable
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        avatar: ""
    });

    //useState variable for the modal
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    //set useState variables as user inputs/changes data
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    //set avatar
    const handleAvatarSelect = (avatarSrc) => {
        setFormData({
            ...formData,
            avatar: avatarSrc.src
        });
    };

    const registerAdmin = async (userData) => {
        try {
            const response = await axios.post("/api/auth/register/admin", userData);
            alert("Admin registered successfully!");
            //navigate to login when registration successful
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

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (!formData.avatar) {
            alert("Please choose an avatar first.");
            return;
        }

        const { username, password, avatar } = formData;
        registerAdmin({ username, password, avatar });
    };

    return(
        <div className="app-container">
            <div className="outer">
                <div className="auth-form">
                    <Form onSubmit={handleSubmit} data-bs-theme="dark">
                        <h2>ADMIN REGISTRATION</h2>
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

                        <div className="mb-3 text-center">
                            {/*button to show modal and select profile*/}
                            <Button variant="secondary" onClick={() => setShow(true)}>
                                Choose Avatar
                            </Button>
                            {formData.avatar && (
                                <div className="mt-3">
                                    <p>Selected Avatar:</p>
                                    <img
                                        src={`/avatars/${formData.avatar}`}
                                        alt="selected avatar"
                                        className="rounded-circle"
                                        height="100"
                                        width="auto"
                                    />
                                </div>
                            )}
                        </div>
                        {/*register button*/}
                        <div className="d-grid gap-2">
                            <Button type="submit" variant="primary">Register</Button>
                        </div>
                    </Form>
                    {/*pass the props to ProfileSetup component*/}
                    <ProfileSetup
                        show={show}
                        handleClose={() => setShow(false)}
                        onAvatarSelect={handleAvatarSelect}
                    />
                </div>
            </div>

        </div>

    )
}