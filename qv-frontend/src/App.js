import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import QuizGeneration    from "./components/QuizGeneration/QuizGeneration";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/generate-quiz" element={<QuizGeneration />} />
            </Routes>
        </Router>
    );
}

export default App;


