import {BrowserRouter as Router, Routes, Route} from 'react-router';
import {useEffect, useState} from "react";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import UserRegistration from "./components/auth/UserRegistration";
import AdminRegistration from "./components/auth/AdminRegistration";
import RouteGuard from "./components/RouteGuard";

import UserDashboard from "./components/dashboards/UserDashboard";
import NavbarComponent from "./components/NavbarComponent";
import AdminDashboard from "./components/dashboards/AdminDashboard";

function App() {
    //store user data in a useState variable
    const [userData, setUserData] = useState({
        id:"",
        username:"",
        role:"",
    });
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("isLoggedIn") === "true";
    });

    useEffect(() => {
        const storedLogin = localStorage.getItem("isLoggedIn") === "true";
        const storedUser = localStorage.getItem("userData");

        if (storedLogin && storedUser) {
            setIsLoggedIn(true);
            setUserData(JSON.parse(storedUser));
        } else {
            setIsLoggedIn(false);
            setUserData({ id: "", username: "", role: "" });
        }
    }, []);


  return (
      <div className="app-container">
          <Router>
              <NavbarComponent isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserData={setUserData}/>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserData={setUserData}/>} />
                  <Route path="/register" element={<UserRegistration />} />
                  <Route path="/register/admin" element={<AdminRegistration />} />

                  {/* protected routes - must be logged in to access */}
                  <Route
                      path="/dashboard"
                      element={
                          <RouteGuard isLoggedIn={isLoggedIn}>
                              {/* Admin dashboard if user is Admin else User dashboard*/}
                              {userData.role === "ADMIN" ?
                                  <AdminDashboard userData={userData}/> : <UserDashboard userData={userData}/>
                              }
                          </RouteGuard>
                      }
                  />

              </Routes>
          </Router>
      </div>
  );
}

export default App;


