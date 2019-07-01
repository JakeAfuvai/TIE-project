import React, { useState, useEffect } from "react"
import { withContext } from "../AppContext";
import AddHelmetForm from "./AddHelmetForm";
import Helmet from "./Helmet"
import "./HelmetList.css"

const HelmetList = props => {
    const {getPlayers, getHelmets} = props

    useEffect(() => {
        getPlayers()
    }, [getPlayers])

    useEffect(() => {
        getHelmets()
    }, [getHelmets])
    
    const [showAddHelmetModal, setShowAddHelmetModal] = useState(false)
    const showModalClass = showAddHelmetModal ? "" : "no-display"

    const handleModalLogic = () => {
        setShowAddHelmetModal(!showAddHelmetModal)
    }

    return (
        <div className="helmets-container">
            <div className={`add-helmet-container ${showModalClass}`}>
                <AddHelmetForm handleAddHelmetModal={handleModalLogic} />
            </div>
            <div className="helmet-title-container">
                <h1>HELMETS</h1>
                <button onClick={handleModalLogic}>ADD HELMET</button>
            </div>
            <div className="helmet-grid-titles">
                <h2 className="helmet-make-title">Helmet Make</h2>
                <h2 className="helmet-model-title">Model</h2>
                <h2 className="helmet-size-title">Size</h2>
                <h2 className="helmet-helmet-number-title">Helmet Number</h2>
                <h2 className="helmet-assigned-to-title">Assigned To</h2>
            </div>
            <hr style={{width: "70vw", margin: "0 auto"}}/>
            <Helmet/>
        </div>
    )
}

export default withContext(HelmetList)