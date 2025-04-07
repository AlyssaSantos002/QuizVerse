export default function QuizHistory({userData}){
    return(
        <div className="dash-tab">
            <h1>Quizzes taken by the user will appear here </h1>
            <h2>{userData.username}</h2>
            <h3>{userData.role}</h3>
        </div>
    )
}