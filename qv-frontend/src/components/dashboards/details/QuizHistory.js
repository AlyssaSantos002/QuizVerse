import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function QuizHistory({userData}) {
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const navigate = useNavigate();

    //fetch quiz history from backend
    useEffect(() => {
        axios.get('/api/quiz-history/' + userData.id, {withCredentials: true})
            .then((res) => {
                // remove duplicates based on ID and keep only latest
                const seen = new Map();
                const latestOnly = [];

                for (const entry of res.data) {
                    if (!seen.has(entry.id)) {
                        seen.set(entry.id, true);
                        latestOnly.push(entry);
                    }
                }
                setHistory(latestOnly);
                setShowHistory(true);
            })
            .catch((err) => {
                console.error('Failed to fetch quiz history', err);
            });

    }, []);

    return (
        <div className="dash-tab">

            {showHistory ? (
                <div className="quizHistory-wrapper">
                    <h2 className="dash-qh">QUIZ HISTORY</h2>
                    <div className="dashboard-msg">
                        View the quizzes you've done before here! Click on it to review.
                    </div>
                    <div className="dashboard-quizHistory-container">
                        {history.map((entry, index) => (
                            <div key={index} className="dashboard-history"
                                 onClick={() => navigate('/review', {state: {entry}})}>
                                <h4>{entry.category}</h4>
                                <h5>{entry.difficulty}</h5>
                                <p>Score {entry.score} / {entry.total}</p>
                                <p>Date {new Date(entry.date).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (<>
                <div className="dashboard-msg">
                    <p>Quiz history is empty</p>
                </div>
            </>)}

        </div>
    )
}