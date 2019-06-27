import React from "react"
import { Link } from "react-router-dom"
import { withContext } from "./AppContext"

const UserHome = props => {
    return (
        <div className="user-home-container">
            <h1>Hey Coach {props.user.username}, Here's Your Stuff...</h1>
            <Link to="/roster">Roster</Link>
            <Link to="/inventory">Inventory</Link>
        </div>
    )
}

export default withContext(UserHome)