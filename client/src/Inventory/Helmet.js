import React, {useEffect} from "react"
import { withContext } from "../AppContext"
import "./Helmet.css"

const Helmet = props => {
    const {getHelmets, getPlayers} = props
    useEffect(() => {
        getHelmets()
    }, [getHelmets])

    useEffect(() => {
        getPlayers()
    }, [getPlayers])
    
    const sortedHelmets = props.helmets.sort((a,b)=>a.make.localeCompare(b.make))
    .map(
        helmet => 
            <div key={helmet._id} className="grid-helmet-layout">
                <p className="helmet-make">
                    {helmet.make.toUpperCase()} 
                </p>
                <p className="helmet-model">
                    {helmet.model.toUpperCase()}
                </p>
                <p className="helmet-size">
                    {helmet.size.toUpperCase()}
                </p>
                <p className="helmet-number">
                    {helmet.helmetNumber.toUpperCase()}
                </p>
                <p className="helmet-assigned-to">
                    {helmet.assignedTo.toUpperCase()}
                </p>
                {/* <Helmet className="helmet" height="4vh" style={player.helmet === "No Helmet Assigned" ? {fill: "slategray", opacity: 0.3} : {fill: "limegreen"}} onClick={() => props.getHelmetAssignCard(player._id)}/>
                <ShPad className="shoulderpads" height="4vh" style={player.shoulderpads === "No Shoulderpads Assigned" ? {fill: "slategray", opacity: 0.3} : {fill: "limegreen"}} onClick={() => props.getShoulderpadAssignCard(player._id)}/>
                <button className="see-more-btn" onClick={() => props.getPlayerCardInfo(player._id)}>...</button> */}
            </div>    
    )

    return (
        <div className="helmet-container">
            {sortedHelmets}
        </div>
    )
}

export default withContext(Helmet)