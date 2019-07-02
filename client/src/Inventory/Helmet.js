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
                <p className="helmet-assigned-to" style={!helmet.assigned?{color:"limegreen"}:{color:"slategray", opacity: 0.65}}>
                    {helmet.assignedTo.toUpperCase()}
                </p>
            </div>    
    )

    return (
        <div className="helmet-container">
            {sortedHelmets}
        </div>
    )
}

export default withContext(Helmet)