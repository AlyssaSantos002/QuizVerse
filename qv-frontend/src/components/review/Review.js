import React,{useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import "./Result.css";
import axios from "axios";

const Review = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { entry } = location.state || {};

    useEffect(() => {
        console.log("📦 ENTRY DATA:", entry);
    }, [entry]);

    if (!entry || !entry.question || !Array.isArray(entry.question)) {
        return <p style={{ textAlign: "center" }}>No quiz data available.</p>;
    }

    const { category, difficulty, type, score, total, question = [], id } = entry || {};


    const handlePlayAgain = () => {
        navigate('/quiz', {
            state: {
                questions: question,
                category,
                difficulty,
                type,
                historyId: id
            }
        });
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this quiz history?")) {
            axios.delete(`/api/quiz-history/delete/${id}`, {
                withCredentials: true
            })
                .then(() => {
                    alert("Quiz history deleted.");
                    navigate("/");
                })
                .catch((err) => {
                    console.error("Delete failed", err);
                    alert("Failed to delete quiz history.");
                });
        }
    };

    return (
        <div className="Container">
            <div className="result-container">
                <h4>Category: {category}</h4>
                <h5>Difficulty: {difficulty}</h5>
                <h5>Type: {type}</h5>
                <h3>Score: {score} / {total}</h3>

                <div className="btn">
                    <button onClick={handlePlayAgain}>Play Again</button>
                    <button onClick={handleDelete}
                            style={{marginLeft: '10px', backgroundColor: 'crimson', color: 'white'}}>Delete
                    </button>
                    <button onClick={() => navigate("/")} style={{marginLeft: '10px'}}>Back to Home</button>
                </div>
            </div>

            <div className="review-wrapper">
                <div className="review-container">
                <h1>REVIEW</h1>
                    <div className="review-scroll">
                        {question.map((q, i) => {
                            const allAnswers = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);

                            return (
                                <div className="review-question" key={i}>
                                    <h5 dangerouslySetInnerHTML={{ __html: `Q${i + 1}. ${q.question}` }} />

                                    <div className="answers">
                                        {allAnswers.map((ans, index) => {
                                            const isCorrect = ans === q.correct_answer;
                                            const isUserAnswer = ans === q.userAnswer;

                                            return (
                                                <div
                                                    key={index}
                                                    className={`review-answer 
                                                        ${isCorrect ? 'correct' : ''}
                                                        ${isUserAnswer && !isCorrect ? 'wrong' : ''}
                                                        ${isUserAnswer ? 'selected' : ''}`}
                                                    dangerouslySetInnerHTML={{ __html: ans }}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;
