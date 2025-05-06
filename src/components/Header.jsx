import { useEffect } from "react"

function Header({ currentUser }) { 
    
    return (
        <header className="header">
            <img alt="NC-News-logo" src="/colour-logo.png" id="logo"></img>
            <div>
                <h1 id="site-name">Northcoders News</h1> 
                <p id="site-tag">The only place to come for everything Northcoders</p>
            </div>
            <div>
            {currentUser ? (
                    <>
                        <img src={currentUser.avatar_url} alt="User Avatar" id="user-pic"></img>
                        <p>Logged in: {currentUser.username}</p>
                    </>
                ) : (
                    <>
                        <img
                            src="/avatar_placeholder.png"
                            alt="Default Avatar"
                            id="user-pic"
                        ></img>
                        <p>User Logged Out</p>
                    </>
                )}
                </div>
      </header>
    )
}

export default Header