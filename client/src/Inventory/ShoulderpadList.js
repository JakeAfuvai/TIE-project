import React, { useState, useEffect } from "react"
import { withContext } from "../AppContext";
import AddShoulderpadForm from "./AddShoulderpadForm";
import Shoulderpad from "./Shoulderpad"
import Fade from "react-reveal/Fade"
import "./ShoulderpadList.css"

const ShoulderpadList = props => {
    const {getPlayers, getShoulderpads} = props

    useEffect(() => {
        getPlayers()
    }, [getPlayers])

    useEffect(() => {
        getShoulderpads()
    }, [getShoulderpads])
    
    const [showAddShoulderpadModal, setShowAddShoulderpadModal] = useState(false)
    const showModalClass = showAddShoulderpadModal ? "" : "no-display"

    const handleModalLogic = () => {
        setShowAddShoulderpadModal(!showAddShoulderpadModal)
    }

    return (
        <div className="shoulderpads-container">
            <Fade top when={showAddShoulderpadModal}>
            <div className={`add-shoulderpad-container ${showModalClass}`}>
                <AddShoulderpadForm handleAddShoulderpadModal={handleModalLogic} />
            </div>
            </Fade>
            <div className="shoulderpad-title-container">
                <h1>SHOULDER PADS</h1>
                <button onClick={handleModalLogic}>ADD SHOULDER PADS</button>
            </div>
            <div className="shoulderpad-grid-titles">
                <h2 className="shoulderpad-make-title">Make</h2>
                <h2 className="shoulderpad-model-title">Model</h2>
                <h2 className="shoulderpad-size-title">Size</h2>
                <h2 className="shoulderpad-shoulderpad-number-title">#</h2>
                <h2 className="shoulderpad-assigned-to-title">Assigned</h2>
            </div>
            <hr style={{width: "70vw", margin: "0 auto"}}/>
            <Shoulderpad/>
        </div>
    )
}

export default withContext(ShoulderpadList)