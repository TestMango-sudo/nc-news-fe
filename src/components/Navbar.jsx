import { Link } from "react-router"

function Navbar() { 

    return (
    <section id="navigation">
        <nav className="topnav">
            <a href="/">Home</a>
            <a href="/myaccount">My Account</a>
            <a href="#">Log Out</a>
        </nav>
    </section>
    )

}

export default Navbar