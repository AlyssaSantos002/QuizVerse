import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import './auth.css';
import ProfileSetup from "./ProfileSetup";

export default function UserRegistration() {
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

    const handleAvatarSelect = (avatarSrc) => {
        setFormData({
            ...formData,
            avatar: avatarSrc.src
        });
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
        registerUser({ username, password, avatar });
    };

    const registerUser = async (userData) => {
        try {
            const response = await axios.post("/api/auth/register", userData);
            alert("User registered successfully!");
            // navigate to login page when registered successfully
            navigate("/login");
        } catch (error) {
            if (error.response && error.response.data) {
                alert("Error: " + error.response.data);
            } else {
                alert("Error: " + error.message);
            }
        }
    };

    return (
        <div className="user-reg-container">
            <div className="user-registration-msg">
                <img
                    src="SignUpImg.png"
                    alt="Sign Up Image"
                />
            </div>
            <div className="user-reg-form">
                <h2>SIGN UP!</h2>
                {/*registration form*/}
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

                    <Form.Group className="mb-4" controlId="formGroupConfirmPassword">
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

                    <div className="d-grid gap-2">
                        <Button type="submit" variant="primary" className="mt-3">Register</Button>
                    </div>

                    <div className="link mt-2">
                        <p>Already have an account? Login <Link to="/login">here!</Link></p>
                    </div>
                </Form>

                <ProfileSetup
                    show={show}
                    handleClose={() => setShow(false)}
                    onAvatarSelect={handleAvatarSelect}
                />
            </div>
        </div>
    );
}