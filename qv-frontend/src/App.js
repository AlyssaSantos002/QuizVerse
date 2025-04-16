import {BrowserRouter as Router, Routes, Route} from 'react-router';
import {useEffect, useState} from "react";
import "./App.css";

import Home from "./components/home/Home";
import Login from "./components/auth/Login";
import UserRegistration from "./components/auth/UserRegistration";
import AdminRegistration from "./components/auth/AdminRegistration";
import RouteGuard from "./components/RouteGuard";
import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";

import Dashboard from "./components/dashboards/Dashboard";
import QuizGeneration from "./components/QuizGeneration/QuizGeneration";
import Quiz from "./components/Quiz/Quiz";
import Result from "./components/Result/Result";

import axios from "axios";

axios.defaults.withCredentials = true;


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
        const fetchUserDetailsById = async () => {
            const storedLogin = localStorage.getItem("isLoggedIn") === "true";
            const storedUser = localStorage.getItem("userData");

            if (storedLogin && storedUser) {
                const parsedUser = JSON.parse(storedUser);
                const userId = parsedUser.id;

                try {
                    // fetch user from the backend
                    const res = await axios.get(
                        `/api/user/getUser`, {
                            params: { id: userId}
                        });

                    const { id, username, role, avatar } = res.data;

                    // update state and localStorage
                    setUserData({ id, username, role, avatar });
                    localStorage.setItem("userData", JSON.stringify({ id, username, role, avatar }));
                    setIsLoggedIn(true);
                    localStorage.setItem("isLoggedIn", "true");
                } catch (err) {
                    console.error("Failed to fetch user by ID:", err);
                    setUserData({ id: "", username: "", role: "", avatar: "" });
                    setIsLoggedIn(false);
                    localStorage.removeItem("userData");
                    localStorage.removeItem("isLoggedIn");
                }
            } else {
                // if no stored data
                setUserData({ id: "", username: "", role: "", avatar: "" });
                setIsLoggedIn(false);
            }
            setIsUserDataLoaded(true); // always call this at the end
        };
        fetchUserDetailsById();
    }, []);
  
  return (
      <div className="app-container">
          <Router>
              <NavbarComponent
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  setUserData={setUserData}
                  userData={userData}
              />
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/generate-quiz" element={<QuizGeneration />} />
                  <Route path="/quiz" element={<Quiz />} />
                  <Route path="/result" element={<Result />} />
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
                              <div className="loading-page">Loading...</div>
                          )
                      }
                  />

              </Routes>
          </Router>
          <FooterComponent/>
      </div>
  );
}

export default App;


