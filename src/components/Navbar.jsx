import { Link } from "react-router"

function Navbar() { 

    return (
        <section>
        <nav className="topnav">
            <a href="/">Home</a>
            <a herf="/myaccount/">My Account</a>
            <a href="#">Log Out</a>
        </nav>
    </section>
    )

}

export default Navbar