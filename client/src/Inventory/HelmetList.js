import React from "react"
import { withContext } from "../AppContext"

const HelmetList = props => {
    return (
        <div className="helmet-list-container">
            <h1>Helmets</h1>
            <button>Add a Helmet</button>
        </div>
    )
}

export default withContext(HelmetList)