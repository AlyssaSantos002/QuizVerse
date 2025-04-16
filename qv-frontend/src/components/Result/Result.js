import {useEffect} from "react";
import {useNavigate, useLocation} from 'react-router-dom';
import axios from "axios";
import "./Result.css";

const Result = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const score = location.state?.score;
    const total = location.state?.total;
    const questions = location.state?.questions;
    const {category, difficulty, type} = location.state;
    const percentage = Math.round((score / total) * 100);
    const historyId = location.state?.historyId;

    const getEmoji = () => {
        if (percentage >= 90)
            return {src: "/emojis/amazing.gif", message: "Genius Level - you nailed it!"};
        if (percentage >= 70)
            return {src: "/emojis/awesome.gif", message: "Well done, smarty!"};
        if (percentage >= 50)
            return {src: "/emojis/notbad.gif", message: "Not bad! Keep going!"};
        if (percentage >= 30)
            return {src: "/emojis/gettingthere.gif", message: "Keep practicing - you'll get better!"};
        return {src: "/emojis/tryagain.gif", message: "Try again? "};
    };
    const {src, message} = getEmoji();


    const handleSubmit = () => {
        sessionStorage.removeItem('quizSubmitted');
        navigate("/")
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userData'));
        const alreadySubmitted = sessionStorage.getItem('quizSubmitted');

        if (user && questions && !alreadySubmitted) {
            const formattedQuestions = questions.map(q => ({
                question: q.question,
                correct_answer: q.correct_answer,
                incorrect_answers: q.incorrect_answers,
                userAnswer: q.userAnswer || ""
            }));

            const quizData = {
                userId: user.id,
                category,
                difficulty,
                type,
                score,
                total,
                question: formattedQuestions
            };

            const request = historyId
                ? axios.put(`/api/quiz-history/update/${historyId}`, quizData, { withCredentials: true })
                : axios.post('/api/quiz-history', quizData, { withCredentials: true });

            request
                .then((res) => {
                    console.log("Quiz history saved/updated:", res.data);
                    sessionStorage.setItem('quizSubmitted', 'true');
                })
                .catch((err) => {
                    console.error("Failed to save/update quiz history", err);
                });
        }
    }, []);



    return (
        <>
            <div className="Container">

                <div className="result-container">

                    <div className="result">
                        <h5>YOUR SCORE </h5>
                        <h2>{score} / {total}</h2>
                        <img src={src} alt="result emoji" width="150" height="150"/>
                        <h4>{message}</h4>
                    </div>

                    <div className="btn">
                        <button onClick={handleSubmit}>Go Home</button>
                    </div>
                </div>


                <div className="review-wrapper">
                    {questions && questions.length > 0 && (
                        <div className="review-container">
                            <h1>REVIEW</h1>
                            <div className="review-scroll">
                                {questions.map((q, i) => {
                                    const allAnswers = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);

                                    return (
                                        <div className="review-question" key={i}>
                                            <h5 dangerouslySetInnerHTML={{__html: `Q${i + 1}. ${q.question}`}}/>

                                            <div className="answers">
                                                {allAnswers.map((ans, index) => {
                                                    const isCorrect = ans === q.correct_answer;
                                                    const isUserAnswer = ans === q.userAnswer;

                                                    let answerClass = "review-answer";
                                                    if (isCorrect) answerClass += " correct";
                                                    else if (isUserAnswer) answerClass += " wrong";

                                                    return (
                                                        <div
                                                            key={index}
                                                            className={answerClass}
                                                            dangerouslySetInnerHTML={{__html: ans}}
                                                        />
                                                    );
                                                })}
                                            </div>

                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </>
    )
}

export default Result;