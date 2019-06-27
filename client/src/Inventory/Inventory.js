import React from "react"
import { Link } from "react-router-dom"
import { withContext } from "../AppContext"

const Inventory = props => {
    return (
        <div className="inventory-container">
            <Link to={"/helmet_list"}>Helmets</Link>
            <Link to={"/shoulderpad_list"}>Shoulder Pads</Link>
        </div>
    )
}

export default withContext(Inventory)