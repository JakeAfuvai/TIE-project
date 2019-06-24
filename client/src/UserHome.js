import React from "react"
import { Link } from "react-router-dom"

const UserHome = () => {
    return (
        <div className="user-home-container">
            <h1>USER HOME</h1>
            <Link to="/roster">Roster</Link>
            <Link to="/inventory">Inventory</Link>
        </div>
    )
}

export default UserHome