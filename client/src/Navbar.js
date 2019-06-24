import React from "react"
import { Link } from "react-router-dom"
import { withContext } from "./AppContext"

const Navbar = (props) => {
    const conditionalNav = !props.token ?
        <>
            <div className="nav-link">
                <Link to="/signup">Sign Up</Link>
            </div>
            <div className="nav-link">
                <Link to="/login">Log In</Link>
            </div>
        </>
        :
        <>
            <div className="nav-link">
                <Link to="/user_home">Welcome, {props.user.username}</Link>
            </div>
            <div className="nav-link">
                <button onClick={() => props.logout()}>Logout</button>
            </div>
        </>
    return (
        <div className="navbar-container">
            <h1>TIE</h1>
            {conditionalNav}
        </div>
    )
}

export default withContext(Navbar)