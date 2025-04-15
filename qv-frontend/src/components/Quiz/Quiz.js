import React, {useEffect} from "react";
import {useState} from "react";
import {useNavigate, useLocation} from 'react-router-dom';
import "./Quiz.css";
import ProgressBar from 'react-bootstrap/ProgressBar';

const Quiz = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0)
    const [timer, setTimer] = useState(10);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const questions = location.state?.questions;
    const category = location.state?.category;
    const difficulty = location.state?.difficulty;
    const currentQuestion = questions[currentIndex];

    //To shuffle the answers
    const shuffledAnswer = () => {
        const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
        return answers.sort(() => Math.random() - 0.5);
    };
    const [shuffledAnswers, setShuffledAnswers] = useState(shuffledAnswer());


    useEffect(() => {
        setShuffledAnswers(shuffledAnswer());
        setTimer(10);
    }, [currentIndex]);

    // Timer countdown
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsAnswered(true);
                    setSelectedAnswer(null);
                    setTimeout(() => {
                        setIsAnswered(false);
                        handleNext();
                    }, 2000);

                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    //if questions length is less than increase the index else navigate to result page
    const handleNext = () => {
        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(currentIndex + 1)
        } else {
            navigate('/result', {state: {score, total: questions.length,questions}});
        }
    };

    //if answer is right the score will increase by 1
    const handleAnswer = (ans) => {
        setSelectedAnswer(ans);
        setIsAnswered(true);

        setTimeout(() => {
            if (ans === currentQuestion.correct_answer) {
                setScore(prev => prev + 1);
            }
            setSelectedAnswer(null);
            setIsAnswered(false);
            handleNext();
        }, 2000);
    };
    {
        console.log('Category:', category, 'Difficulty:', difficulty)
    }

    //for progress bar
    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
        <>
            <div>
                {/*Progress Bar*/}
                <div className="progressBar">

                    <h3>{category}</h3>

                    <ProgressBar now={progress} label={`${Math.round(progress)}%`}/>


                </div>


                {/*Questions and Answers*/}
                {questions.length > 0 && (
                    <div key={currentIndex}>
                        <div className="Question">
                            <p>Question {currentIndex + 1} of {questions.length}</p>
                            <h2 dangerouslySetInnerHTML={{__html: currentQuestion.question}}/>
                        </div>

                        <div className="bottom-container">
                        <div className="timer-wrapper">
                                <div className={`timer-container ${timer <= 5 ? 'danger' : ''}`}>
                                    <div className="timer-anime">
                                        <p className="timer">{timer}</p>
                                    </div>
                                </div>
                            </div>

                            <div key={currentIndex}>
                                <div className="Answers">
                                    {shuffledAnswers.map((option, index) => {
                                        let statusClass = "";
                                        if (isAnswered) {
                                            if (option === currentQuestion.correct_answer) {
                                                statusClass = "correct";
                                            } else if (option === selectedAnswer) {
                                                statusClass = "wrong";
                                            }
                                        }

                                        return (
                                            <button
                                                key={index}
                                                className={`answer-option ${statusClass}`}
                                                onClick={() => !isAnswered && handleAnswer(option)}
                                                disabled={isAnswered}
                                            >
                                                <span dangerouslySetInnerHTML={{__html: option}}/>
                                            </button>

                                        );
                                    })}

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );

}

export default Quiz;