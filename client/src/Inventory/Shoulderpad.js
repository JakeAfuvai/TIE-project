import React, {useEffect} from "react"
import { withContext } from "../AppContext"
import "./Shoulderpad.css"

const Shoulderpad = props => {
    const {getShoulderpads, getPlayers} = props
    useEffect(() => {
        getShoulderpads()
    }, [getShoulderpads])

    useEffect(() => {
        getPlayers()
    }, [getPlayers])
    
    const sortedShoulderpads = props.shoulderpads.sort((a,b)=>a.make.localeCompare(b.make))
    .map(
        shoulderpad => 
            <div key={shoulderpad._id} className="grid-shoulderpad-layout">
                <p className="shoulderpad-make">
                    {shoulderpad.make.toUpperCase()} 
                </p>
                <p className="shoulderpad-model">
                    {shoulderpad.model.toUpperCase()}
                </p>
                <p className="shoulderpad-size">
                    {shoulderpad.size.toUpperCase()}
                </p>
                <p className="shoulderpad-number">
                    {shoulderpad.shoulderpadNumber.toUpperCase()}
                </p>
                <p className="shoulderpad-assigned-to" style={!shoulderpad.assigned?{color:"limegreen"}:{color:"slategray", opacity: 0.65}}>
                    {shoulderpad.assignedTo.toUpperCase()}
                </p>
            </div>    
    )

    return (
        <div className="shoulderpad-container">
            {sortedShoulderpads}
        </div>
    )
}

export default withContext(Shoulderpad)