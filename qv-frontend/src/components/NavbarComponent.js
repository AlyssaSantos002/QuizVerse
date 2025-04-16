import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

export default function NavbarComponent({isLoggedIn, setIsLoggedIn, setUserData, userData}) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            //call logout api
            await axios.post("/api/auth/logout", {}, {withCredentials: true});

            //clear state
            setIsLoggedIn(false);
            setUserData({id: "", username: "", role: "", avatar: ""});

            //clear localStorage
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userData");
            //navigate to login page when logged out
            navigate("/login");

        } catch (err) {
            console.error("Logout error:", err);
            alert("Failed to logout.");
        }
    };

    return (
        <Navbar expand="lg" className="bg-body-transparent" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img src='logoNav3.png'
                        alt='Quiz Verse Logo'
                         width="150"
                         height="auto"
                         className="d-inline-block align-content-center"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>

                            {isLoggedIn ? (
                                <NavDropdown title={userData.username} id="basic-nav-dropdown" align="end">
                                    {/* if logged in - dashboard and logout shown as option */}
                                    <NavDropdown.Item as={Link} to="/dashboard">Dashboard</NavDropdown.Item>
                                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <>
                                    {/* if not logged in - Login and register shown as options*/}
                                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                                </>
                            )}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}