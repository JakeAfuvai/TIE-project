import React, {useState} from "react"
import { Link } from "react-router-dom"
import { withContext } from "./AppContext"
import { ReactComponent as FootballMenu } from "./images/footballMenu.svg"
import "./Navbar.css"

const Navbar = (props) => {
    const [menuToggle, setMenuToggle] = useState(false)

    const handleMenuClick = () => {
        setMenuToggle(!menuToggle)
    }
    const handleLogout = () => {
        props.logout()
        handleMenuClick()

    }
    const hiddenClass = !menuToggle ? "no-display" : ""

    const conditionalNav = !props.token ?
        <div className="nav-link-container">
            <div className="nav-link">
                <Link to="/signup">Sign Up</Link>
            </div>
            <div className="nav-link">
                <Link to="/login">Log In</Link>
            </div>
            <div className="nav-link">
                <FootballMenu 
                    className="fm-icon" 
                    height="40pt"
                    onClick={handleMenuClick}
                />
                <div className={`outer-side-drawer ${hiddenClass}`}>
                    <div className={`side-drawer`}>
                        <button onClick={handleMenuClick}>X</button>
                        <h2 style={{position: "relative",top: "-50%"}}>Sign Up or Log In to view Menu</h2>
                    </div>
                </div>
            </div>
        </div>
        :
        <div className="nav-link-container">
            <div className="nav-link">
                <Link to="/user_home">Welcome, {props.user.username}</Link>
            </div>
            {/* <div className="nav-link">
                <button onClick={() => props.logout()}>Logout</button>
            </div> */}
            <div className="nav-link">
                <FootballMenu 
                    className="fm-icon" 
                    height="40pt"
                    onClick={handleMenuClick}
                />
                <div className={`outer-side-drawer ${hiddenClass}`}>
                    <div className={`side-drawer`}>
                        <button onClick={handleMenuClick}>X</button>
                        <Link 
                            to="/user_home" 
                            onClick={handleMenuClick}>My Home
                        </Link>
                        <Link 
                            to="/roster" 
                            onClick={handleMenuClick}>Roster
                        </Link>
                        <Link 
                            to="/inventory" 
                            onClick={handleMenuClick}>Inventory
                        </Link>
                        <Link 
                            to="/helmet_list" 
                            onClick={handleMenuClick}>Helmets
                        </Link>
                        <Link 
                            to="/shoulderpad_list" 
                            onClick={handleMenuClick}>Shoulder Pads
                        </Link>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    return (
        <div className="navbar-container">
            <Link to="/"><h1 className="navbar-title">TIE</h1></Link>
            {conditionalNav}
        </div>
    )
}

export default withContext(Navbar)