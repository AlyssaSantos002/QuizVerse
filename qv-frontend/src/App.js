import {BrowserRouter as Router, Routes, Route} from 'react-router';
import {useEffect, useState} from "react";
import axios from "axios";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import UserRegistration from "./components/auth/UserRegistration";
import AdminRegistration from "./components/auth/AdminRegistration";
import RouteGuard from "./components/RouteGuard";

import UserDashboard from "./components/auth/UserDashboard";
import NavbarComponent from "./components/NavbarComponent";

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("isLoggedIn") === "true";
    });

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const res = await axios.get("/api/users/me", {
                    withCredentials: true,
                });
                console.log(res.data);
                setIsLoggedIn(true);
                localStorage.setItem("isLoggedIn", "true");
            } catch (err) {
                setIsLoggedIn(false);
                localStorage.removeItem("isLoggedIn");
            }
        };

        checkLoginStatus();
    }, []);

  return (
      <Router>
          <NavbarComponent isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
              <Route path="/register" element={<UserRegistration />} />
              <Route path="/register/admin" element={<AdminRegistration />} />
              {/* protected routes - must be logged in to access */}
              <Route path="/user-dashboard" element={
                      <RouteGuard isLoggedIn={isLoggedIn}>
                          <UserDashboard />
                      </RouteGuard>
                  }
              />
          </Routes>
      </Router>
  );
}

export default App;
