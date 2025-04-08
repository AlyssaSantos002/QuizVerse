import React from "react";
import {useState} from "react";
import {useNavigate, useLocation} from 'react-router-dom';
import "./Quiz.css";
import axios from "axios";
import quiz1 from '../home/Quiz1.png'


const Quiz = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0)
    const [timer, setTimer] = useState(15);

    const navigate = useNavigate();
    const location = useLocation();
    const questions = location.state?.questions;
    const currentQuestion = questions[currentIndex];

    const handleAnswer = (ans) => {
        if (ans === currentQuestion.correct_answer) {
            setScore(prev => prev + 1);
        }
        handleNext();
    };

    const handleNext = () => {
        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(currentIndex + 1)
        } else {
            navigate('/result', {state: {score, total: questions.length}});
        }
    };

    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
        <>
            <div>
                <h2>Question {currentIndex + 1} </h2>


            </div>
        </>
    )
}

export default Quiz;