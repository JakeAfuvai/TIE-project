import React from "react"
import { withContext } from "../AppContext";

const ShoulderpadList = props => {
    return (
        <div className="shoulderpad-list-container">
            <h1>Shoulder Pads</h1>
            <button>Add Shoulder Pads</button>
        </div>
    )
}

export default withContext(ShoulderpadList)