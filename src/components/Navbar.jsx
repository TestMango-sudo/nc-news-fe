import { useState } from "react"
import { Link, Navigate } from "react-router"
import domLoaded from 'dom-loaded'

function Navbar({ currentUser , handleLogout} ) { 
    
    domLoaded.then(() => {
        const logout = document.getElementById("log-out")
        logout.addEventListener("click", (e) => {
        e.preventDefault()
        if (currentUser) {
            handleLogout()
        } else if (!currentUser) { 
            handleLogout()
        }
    })
})     


return (
    <section id="navigation">
        <nav className="topnav">
            <a href="/">Home</a>
            <a href="/myaccount">My Account</a>
            <a  id="log-out" href="#">{currentUser ? 'Log Out' : 'Log In'}</a>
        </nav>
    </section>
    )

}

export default Navbar