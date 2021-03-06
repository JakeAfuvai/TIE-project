import React, { useState, useEffect } from "react"
import { withContext } from "../AppContext";
import AddPlayerForm from "./AddPlayerForm";
import Player from "./Player"
import Fade from "react-reveal/Fade"
import "./Roster.css"

const Roster = props => {
    const {getPlayers, getHelmets, getShoulderpads} = props

    useEffect(() => {
        getPlayers()
    }, [getPlayers])

    useEffect(() => {
        getHelmets()
    }, [getHelmets])

    useEffect(() => {
        getShoulderpads()
    }, [getShoulderpads])
    
    const [showAddPlayerModal, setShowAddPlayerModal] = useState(false)
    const showModalClass = showAddPlayerModal ? "" : "no-display"

    const handleModalLogic = () => {
        setShowAddPlayerModal(!showAddPlayerModal)
    }

    return (
        <div className="roster-container">
            <Fade top when={showAddPlayerModal}>
            <div className={`add-player-container ${showModalClass}`}>
                <AddPlayerForm handleAddPlayerModal={handleModalLogic} />
            </div>
            </Fade>
            <div className="roster-title-container">
                <h1>ROSTER</h1>
                <button onClick={handleModalLogic}>ADD PLAYER</button>
            </div>
            <div className="player-grid-titles">
                <h2 className="player-name-title">Name</h2>
                <h2 className="player-grade-title">Grade</h2>
                <h2 className="player-helmet-title">Helmet</h2>
                <h2 className="player-shoulderpad-title">Sh Pad</h2>
                <h2 className="player-see-more-title">Card</h2>
            </div>
            <hr style={{width: "70vw", margin: "0 auto"}}/>
            <Player 
                roster={props.players}
                stateHelmets={props.helmets}
                stateShoulderpads={props.shoulderpads}
            />
        </div>
    )
}

export default withContext(Roster)