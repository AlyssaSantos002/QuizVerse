import {useNavigate, useLocation} from 'react-router-dom';
import "./Result.css";

const Result = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const score = location.state?.score;
    const total = location.state?.total;
    const percentage = Math.round((score / total) * 100);

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


    return (
        <>
            <div className="result-container">

                <div className="result">
                    <h2>Your Score: {score} / {total}</h2>
                    <img src={src} alt="result emoji" width="150" height="150"/>
                    <h4>{message}</h4>
                </div>

                <div className="btn">
                    <button>Go Home</button>
                    <button>Review</button>
                </div>
            </div>

        </>
    )
}

export default Result;