import React from "react"
import { Link } from "react-router-dom"
import { withContext } from "../AppContext"
import "./Inventory.css"

const Inventory = props => {
    return (
        <div className="inventory-container">
            <h1>Inventory</h1>
            <Link to={"/helmet_list"}>Helmets</Link>
            <Link to={"/shoulderpad_list"}>Shoulder Pads</Link>
        </div>
    )
}

export default withContext(Inventory)