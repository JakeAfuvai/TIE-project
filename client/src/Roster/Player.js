import React, { useState, useEffect } from "react"
import { ReactComponent as Helmet } from "../images/helmets.svg"
import { ReactComponent as ShPad } from "../images/spads.svg"
import { withContext } from "../AppContext"
import "./Player.css"

const Player = props => {
    const {getHelmets, getShoulderpads} = props
    useEffect(() => {
        getHelmets()
    }, [getHelmets])

    useEffect(() => {
        getShoulderpads()
    }, [getShoulderpads])

    const [lastname, setLastname] = useState(props.player.lastname)
    const [firstname, setFirstname] = useState(props.player.firstname)
    const [grade, setGrade] = useState(props.player.grade)
    const [selectedHelmet, setSelectedHelmet] = useState("")
    const [selectedShoulderpad, setSelectedShoulderpad] = useState("")


    // filtered helmets to display / select only available helmets/spads
    const filteredHelmets = props.stateHelmets
        .filter(helmet => !helmet.assigned)
        .sort((a,b) => a.make.localeCompare(b.make))
        // .sort((a,b) => a.helmetNumber.localeCompare(b.helmetNumber))
        // // .sort((a,b) => a.size.localeCompare(b.size))
    const filteredShoulderpads = props.shoulderpads
        .filter(shoulderpad => !shoulderpad.assigned)
        .sort((a,b) => a.make.localeCompare(b.make))
        // .sort((a,b) => a.shoulderpadNumber.localeCompare(b.shoulderpadNumber))
        // .sort((a,b) => a.size.localeCompare(b.size))


    // assign / unassign helmet/spad logic    
    const handleAssignHelmet = (playerId, playerLN, playerFN, playerSP, helmetString) => {
        const helmetArray = helmetString.split(" ")
        const [helmetId, helmetMake, helmetNumber, helmetSize] = helmetArray
        const updatedPlayer = {
                helmet: `${helmetMake} ${helmetNumber} ${helmetSize}`
        }
        props.editPlayer(playerId, updatedPlayer)
        props.getPlayers()
        setSelectedHelmet("")

        const updatedHelmet = {
            assigned: true,
            assignedTo: playerLN + " " + playerFN
        }
        props.editHelmet(helmetId, updatedHelmet)
        props.closeHelmetAssignCard(playerId)
    }
    const handleAssignShoulderpad = (playerId, playerLN, playerFN, playerHelmet, shoulderPadString) => {
        const shoulderPadArray = shoulderPadString.split(" ")
        const [shoulderPadId, shoulderPadMake, shoulderPadNumber, shoulderPadSize] = shoulderPadArray
        const updatedPlayer = {
                shoulderpads: `${shoulderPadMake} ${shoulderPadNumber} ${shoulderPadSize}`
        }
        props.editPlayer(playerId, updatedPlayer)
        props.getPlayers()
        setSelectedShoulderpad("")

        const updatedShoulderpad = {
            assigned: true,
            assignedTo: playerLN + " " + playerFN
        }
        props.editShoulderpad(shoulderPadId, updatedShoulderpad)
        props.closeShoulderpadAssignCard(playerId)
    }
    const handleUnassignHelmet = (playerId, playerSP, helmetString) => {
        const helmetArray = helmetString.split(" ")
        const [helmetMake, helmetNumber, helmetSize] = helmetArray
        const foundHelmet = props.stateHelmets.find(helmet => helmet.make === helmetMake && helmet.helmetNumber === helmetNumber && helmet.size === helmetSize)
        const updatedPlayer = {
                helmet: "No Helmet Assigned"
        }
        props.editPlayer(playerId, updatedPlayer)
        props.getPlayers()
        
        const updatedHelmet = {
            assigned: false,
            assignedTo: "unassigned"
        }
        props.editHelmet(foundHelmet._id, updatedHelmet)
        props.closeHelmetAssignCard(playerId)
    }
    const handleUnassignShoulderpad = (playerId, playerHelmet, shoulderpadString) => {
        const shoulderpadArray = shoulderpadString.split(" ")
        const [shoulderpadMake, shoulderpadNumber, shoulderpadSize] = shoulderpadArray
        const foundShoulderpad = props.stateShoulderpads.find(shoulderpad => shoulderpad.make === shoulderpadMake && shoulderpad.shoulderpadNumber === shoulderpadNumber && shoulderpad.size === shoulderpadSize)
        const updatedPlayer = {
                shoulderpads: "No Shoulderpads Assigned"
        }
        props.editPlayer(playerId, updatedPlayer)
        props.getPlayers()
        
        const updatedShoulderpad = {
            assigned: false,
            assignedTo: "unassigned"
        }
        props.editShoulderpad(foundShoulderpad._id, updatedShoulderpad)
        props.closeShoulderpadAssignCard(playerId)
    }


    
    const helmets = props.player.helmet && props.player.helmet === "No Helmet Assigned" ?
        <>
        <select name="helmet" onChange={e => setSelectedHelmet(e.target.value)}>
            <option value="">-Select A Helmet-</option>
            {filteredHelmets.map(helmet => 
                <option key={helmet._id} value={`${helmet._id} ${helmet.make} ${helmet.helmetNumber} ${helmet.size}`}>{`${helmet.make}-${helmet.helmetNumber}-${helmet.size}`}</option>
            )}
        </select>
        <button onClick={() => handleAssignHelmet(props.player._id, props.player.lastname, props.player.firstname, props.player.shoulderpads, selectedHelmet)}>Assign Helmet</button>
        </>
        : props.player.helmet &&
        <>
        <p>{`${props.player.helmet}`}</p><button onClick={() => handleUnassignHelmet(props.player._id, props.player.shoulderpads, props.player.helmet)}>Unassign Helmet</button>
        </>



    const shoulderpads = props.player.shoulderpads && props.player.shoulderpads === "No Shoulderpads Assigned" ?
        <>
        <select name="shoulderpad" onChange={e => setSelectedShoulderpad(e.target.value)}>
            <option value="">-Select A Shoulder Pad-</option>
            {filteredShoulderpads.map(shoulderpad => 
                <option key={shoulderpad._id} value={`${shoulderpad._id} ${shoulderpad.make} ${shoulderpad.shoulderpadNumber} ${shoulderpad.size}`}>{`${shoulderpad.make}-${shoulderpad.shoulderpadNumber}-${shoulderpad.size}`}</option>
            )}
        </select>
        <button onClick={() => handleAssignShoulderpad(props.player._id, props.player.lastname, props.player.firstname, props.player.helmet, selectedShoulderpad)}>Assign Shoulder Pad</button>
        </>
        : props.player.shoulderpads &&
        <>
        <p>{`${props.player.shoulderpads}`}</p><button onClick={() => handleUnassignShoulderpad(props.player._id, props.player.helmet, props.player.shoulderpads)}>Unassign Shoulder Pads</button>
        </>



    const showPositions = props.player.position && props.player.position.length > 0 ?
        props.player.position.map((position, i) => <li key={props.player._id + i}>{position}</li>)
        : 
        `No Assigned Positions for ${props.player.firstname}`

    

    const modal = props.player.showModal && 
		<div className="outer-modal">
			<div className="modal-show">
				<button onClick={() => props.closePlayerCardInfo(props.player._id)}>X</button>
                <button>Edit Player Info</button>
				<h1>{props.player.lastname.toUpperCase()} {props.player.firstname.toLowerCase()}</h1>
				<h2>Grade: {props.player.grade}</h2>
                <div>{props.player.position.length > 1 ? "Positions" : "Position"}: {showPositions}</div>
                <div className="equipment-con">
                    <h2>Equipment</h2>
                    <h3>Helmet</h3>
                    <h4>{props.player.helmet}</h4>

                    <h3>Shoulder Pads</h3>
                    <h4>{props.player.shoulderpads}</h4>
                </div>
			</div>		
		</div>
        // helmet assign modal
        const helmetAssignModal = props.player.showHelmetModal &&
            <div className="outer-modal">
                <div className="modal-show">
                    <button onClick={() => props.closeHelmetAssignCard(props.player._id)}>X</button>
                    <h1>{props.player.lastname.toUpperCase()} {props.player.firstname.toLowerCase()}</h1>
                    <h3>Helmet</h3>
                    {helmets}
                </div>
            </div>
        // shoulderpad assign modal
        const shoulderpadAssignModal = props.player.showShoulderpadModal &&
            <div className="outer-modal">
                <div className="modal-show">
                    <button onClick={() => props.closeShoulderpadAssignCard(props.player._id)}>X</button>
                    <h1>{props.player.lastname.toUpperCase()} {props.player.firstname.toLowerCase()}</h1>
                    <h3>Shoulder Pads</h3>
                    {shoulderpads}
                </div>
            </div>


    // Filtered and Sorted Players based on grade and alphabetical
    const sortedSeniorPlayers = props.roster.filter(
            player => player.grade === "Senior"
        )
        .sort(
            (a,b) => a.lastname.localeCompare(b.lastname)
        )
        .map(
            player => 
                <div key={player._id} className="grid-player-layout">
                    <p>
                        {player.lastname.toUpperCase()} {player.firstname.toLowerCase()}
                    </p>
                    <p>
                        {player.grade.toUpperCase()}
                    </p>
                    <Helmet className="helmet" height="4vh" style={player.helmet === "No Helmet Assigned" ? {fill: "slategray", opacity: 0.3} : {fill: "limegreen"}} onClick={() => props.getHelmetAssignCard(player._id)}/>
                    <ShPad className="shoulderpads" height="4vh" style={player.shoulderpads === "No Shoulderpads Assigned" ? {fill: "slategray", opacity: 0.3} : {fill: "limegreen"}} onClick={() => props.getShoulderpadAssignCard(player._id)}/>
                    <button className="see-more-btn" onClick={() => props.getPlayerCardInfo(player._id)}>...</button>
                </div>    
        )
    const sortedJuniorPlayers = props.roster.filter(
        player => player.grade === "Junior"
        )
        .sort(
            (a,b) => a.lastname.localeCompare(b.lastname)
        )
        .map(
            player => 
                <div key={player._id} className="grid-player-layout">
                    <p>
                        {player.lastname.toUpperCase()} {player.firstname.toLowerCase()}
                    </p>
                    <p>
                        {player.grade.toUpperCase()}
                    </p>
                    <Helmet className="helmet" height="4vh" style={player.helmet === "No Helmet Assigned" ? {fill: "slategray", opacity: 0.3} : {fill: "limegreen"}} onClick={() => props.getHelmetAssignCard(player._id)}/>
                    <ShPad className="shoulderpads" height="4vh" style={player.shoulderpads === "No Shoulderpads Assigned" ? {fill: "slategray", opacity: 0.3} : {fill: "limegreen"}} onClick={() => props.getShoulderpadAssignCard(player._id)}/>
                    <button className="see-more-btn" onClick={() => props.getPlayerCardInfo(player._id)}>...</button>
                </div>    
        )
        const sortedSophomorePlayers = props.roster.filter(
            player => player.grade === "Sophomore"
        )
        .sort(
            (a,b) => a.lastname.localeCompare(b.lastname)
        )
        .map(
            player => 
                <div key={player._id} className="grid-player-layout">
                    <p>
                        {player.lastname.toUpperCase()} {player.firstname.toLowerCase()}
                    </p>
                    <p>
                        {player.grade.toUpperCase()}
                    </p>
                    <Helmet className="helmet" height="4vh" style={player.helmet === "No Helmet Assigned" ? {fill: "slategray", opacity: 0.3} : {fill: "limegreen"}} onClick={() => props.getHelmetAssignCard(player._id)}/>
                    <ShPad className="shoulderpads" height="4vh" style={player.shoulderpads === "No Shoulderpads Assigned" ? {fill: "slategray", opacity: 0.3} : {fill: "limegreen"}} onClick={() => props.getShoulderpadAssignCard(player._id)}/>
                    <button className="see-more-btn" onClick={() => props.getPlayerCardInfo(player._id)}>...</button>
                </div>    
        )
        const sortedFreshmanPlayers = props.roster.filter(
            player => player.grade === "Freshman"
        )
        .sort(
            (a,b) => a.lastname.localCompare(b.lastname)
        )
        .map(
            player => 
                <div key={player._id} className="grid-player-layout">
                    <p>
                        {player.lastname.toUpperCase()} {player.firstname.toLowerCase()}
                    </p>
                    <p>
                        {player.grade.toUpperCase()}
                    </p>
                    <Helmet className="helmet" height="4vh" style={player.helmet === "No Helmet Assigned" ? {fill: "slategray", opacity: 0.3} : {fill: "limegreen"}} onClick={() => props.getHelmetAssignCard(player._id)}/>
                    <ShPad className="shoulderpads" height="4vh" style={player.shoulderpads === "No Shoulderpads Assigned" ? {fill: "slategray", opacity: 0.3} : {fill: "limegreen"}} onClick={() => props.getShoulderpadAssignCard(player._id)}/>
                    <button className="see-more-btn" onClick={() => props.getPlayerCardInfo(player._id)}>...</button>
                </div>    
        )

        

    return (
        <div className="player-container">
            {sortedSeniorPlayers}
            {sortedJuniorPlayers}
            {sortedSophomorePlayers}
            {sortedFreshmanPlayers}
            {modal}
            {helmetAssignModal}
            {shoulderpadAssignModal} 
        </div>
    )
}

export default withContext(Player)