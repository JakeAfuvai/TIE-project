import React, {useEffect} from "react"
import { Link } from "react-router-dom"
import { withContext } from "../AppContext"
import "./Inventory.css"

const Inventory = props => {
    const {getHelmets, getShoulderpads} = props
    useEffect(() => {
        getHelmets()
    }, [getHelmets])
    useEffect(() => {
        getShoulderpads()
    }, [getShoulderpads])
    const h3Style = {color: "limegreen", margin: "4pt 0"}
    return (
        <div className="inventory-container">
            <h1>Inventory</h1>
            <div className="helmets-rundown">
                <Link to={"/helmet_list"}>Helmets</Link>
                <h3 style={h3Style}>{props.helmets.length} Helmets Total</h3>
                <h3 style={h3Style}>{props.helmets.filter(helmet=>helmet.assigned).length} Helmets Assigned</h3>
            </div>
            <div className="spads-rundown">
                <Link to={"/shoulderpad_list"}>Shoulder Pads</Link>
                <h3 style={h3Style}>{props.shoulderpads.length} Shoulder Pads Total</h3>
                <h3 style={h3Style}>{props.shoulderpads.filter(spad=>spad.assigned).length} Shoulder Pads Assigned</h3>
            </div>
        </div>
    )
}

export default withContext(Inventory)