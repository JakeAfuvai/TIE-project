import React, { useState, useEffect } from "react"
import { withContext } from "../AppContext";
import AddPlayerForm from "./AddPlayerForm";
import Player from "./Player"
import "./Roster.css"

const Roster = props => {
    const {getPlayers, getHelmets} = props

    useEffect(() => {
        getPlayers()
    }, [getPlayers])

    useEffect(() => {
        getHelmets()
    }, [getHelmets])
    
    const [showAddPlayerModal, setShowAddPlayerModal] = useState(false)
    const showModalClass = showAddPlayerModal ? "" : "no-display"

    const handleModalLogic = () => {
        setShowAddPlayerModal(!showAddPlayerModal)
    }

    return (
        <div className="roster-container">
            <div className={`add-player-container ${showModalClass}`}>
                <AddPlayerForm handleAddPlayerModal={handleModalLogic} />
            </div>
            <h1>ROSTER</h1>
            <button onClick={handleModalLogic}>ADD PLAYER</button>
            <Player 
                roster={props.players}
                stateHelmets={props.helmets}
            />
        </div>
    )
}

export default withContext(Roster)