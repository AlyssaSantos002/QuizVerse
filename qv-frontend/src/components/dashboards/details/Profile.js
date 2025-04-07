export default function Profile({userData}){
    return(
        <div className="dash-tab">
            <img
                src={`/avatars/${userData.avatar}`}
                height="200"
                alt={`${userData}'s avatar`}
            />
            <h1>{userData.username}</h1>
            <h2>{userData.role}</h2>
        </div>
    )
}