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
        <div className="roster-container">
            <div className={`add-helmet-container ${showModalClass}`}>
                <AddHelmetForm handleAddHelmetModal={handleModalLogic} />
            </div>
            <h1>HELMETS</h1>
            <button onClick={handleModalLogic}>ADD HELMET</button>
            <Helmet/>
        </div>
    )
}

export default withContext(HelmetList)