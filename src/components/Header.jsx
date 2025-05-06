function Header({ currentUser }) { 

    return (
        <header className="header">
            <img alt="NC-News-logo" id="logo"></img>
            <div>
                <h1 id="site-name">Northcoders News</h1> 
                <p id="site-tag">The only place to come for everything Northcoders</p>
            </div>
            <div>
                <img src={currentUser.avatar_url} alt="User Avatar" id="user-pic"></img>
                <p>Logged in: {currentUser.username }</p>
                </div>
      </header>
    )
}

export default Header