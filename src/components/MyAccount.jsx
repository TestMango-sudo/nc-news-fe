

function MyAccount({ currentUser }) { 
    return (
        <div className="article-item">
            <h2>Your Account</h2>
            <p>Username: {currentUser.username}</p>
            <p>Name: {currentUser.name}</p>
            <img src={ currentUser.avatar_url}></img>
        </div>
    )
}

export default MyAccount