import {useEffect} from "react";
import axios from "axios";

export default function QuizHistory({userData}){
    return(
        <div className="dash-tab">
            <div className="dashboard-msg">
                <p>Quiz history is empty</p>
            </div>
        </div>
    )
}