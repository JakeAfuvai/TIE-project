import React, { useState, useEffect } from "react"
import { withContext } from "../AppContext";
import AddShoulderpadForm from "./AddShoulderpadForm";
import Shoulderpad from "./Shoulderpad"
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
        <div className="shoulderpad-container">
            <div className={`add-shoulderpad-container ${showModalClass}`}>
                <AddShoulderpadForm handleAddShoulderpadModal={handleModalLogic} />
            </div>
            <h1>SHOULDER PADS</h1>
            <button onClick={handleModalLogic}>ADD SHOULDER PADS</button>
            <Shoulderpad/>
        </div>
    )
}

export default withContext(ShoulderpadList)