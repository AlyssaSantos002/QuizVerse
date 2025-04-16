import {useEffect} from "react";
import axios from "axios";

export default function QuizHistory({userData}){
    return(
        <div className="dash-tab">
            <div className="dashboard-msg">
                <p>Quiz history is empty</p>
            </div>

            {/*{showHistory ? (*/}
            {/*    <div className="quizHistory-wrapper">*/}
            {/*        <h3>QUIZ HISTORY</h3>*/}
            {/*        <div className="home-desc">*/}
            {/*            View the quizzes you've done before here! Click on it to review.*/}
            {/*        </div>*/}
            {/*        <div className="quizHistory-container">*/}
            {/*            {history.map((entry, index) => (*/}
            {/*                <div key={index} className="history"*/}
            {/*                     onClick={() => navigate('/review', {state: {entry}})}>*/}
            {/*                    <h4>{entry.category}</h4>*/}
            {/*                    <h5>{entry.difficulty}</h5>*/}
            {/*                    <p>Score {entry.score} / {entry.total}</p>*/}
            {/*                    <p>Date {new Date(entry.date).toLocaleString()}</p>*/}
            {/*                </div>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*): (<> </>)}*/}

        </div>
    )
}