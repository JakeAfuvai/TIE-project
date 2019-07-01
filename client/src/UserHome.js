import React from "react"
import { Link } from "react-router-dom"
import { withContext } from "./AppContext"
import "./UserHome.css"

const UserHome = props => {
    return (
        <div className="user-home-container">
            <h1>Welcome Home Coach {props.user.username.toUpperCase()}</h1>
            <Link to="/roster">Roster</Link>
            <Link to="/inventory">Inventory</Link>
        </div>
    )
}

export default withContext(UserHome)