export default function Profile({userData}){
    return(
        <div>
            <h1>{userData.username}</h1>
            <h2>{userData.role}</h2>
        </div>
    )
}