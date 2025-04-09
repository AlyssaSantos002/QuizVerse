import {BrowserRouter as Router, Routes, Route} from 'react-router';
import {useEffect, useState} from "react";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import UserRegistration from "./components/auth/UserRegistration";
import AdminRegistration from "./components/auth/AdminRegistration";
import RouteGuard from "./components/RouteGuard";

import NavbarComponent from "./components/NavbarComponent";
import Dashboard from "./components/dashboards/Dashboard";

function App() {
    //store user data in a useState variable
    const [userData, setUserData] = useState({
        id:"",
        username:"",
        role:"",
        avatar:""
    });
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("isLoggedIn") === "true";
    });
    //makes sure that userData is loaded first
    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);

    useEffect(() => {
        const storedLogin = localStorage.getItem("isLoggedIn") === "true";
        const storedUser = localStorage.getItem("userData");

        if (storedLogin && storedUser) {
            setIsLoggedIn(true);
            setUserData(JSON.parse(storedUser));
        } else {
            setIsLoggedIn(false);
            setUserData({ id: "", username: "", role: "", avatar:"" });
        }

        setIsUserDataLoaded(true);
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
                          // if userData has loaded go to dashboard or show loading page
                          isUserDataLoaded ? (
                              <RouteGuard isLoggedIn={isLoggedIn}>
                                  <Dashboard setUserData={setUserData} userData={userData} />
                              </RouteGuard>
                          ) : (
                              <div className="loading-page">Loading...</div> // or a loading spinner
                          )
                      }
                  />

              </Routes>
          </Router>
      </div>
  );
}

export default App;
