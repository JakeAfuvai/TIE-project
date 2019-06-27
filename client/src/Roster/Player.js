import React, { useState, useEffect } from "react"
import { withContext } from "../AppContext"
import "./Player.css"

const Player = props => {
    const {getHelmets} = props
    useEffect(() => {
        getHelmets()
    }, [getHelmets])

    const [lastname, setLastname] = useState(props.player.lastname)
    const [firstname, setFirstname] = useState(props.player.firstname)
    const [grade, setGrade] = useState(props.player.grade)
    const [selectedHelmet, setSelectedHelmet] = useState("")
    const [selectedShoulderpad, setSelectedShoulderpad] = useState("")

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

    const handleAssignHelmet = (playerId, helmetString) => {
        const helmetArray = helmetString.split(" ")
        const [helmetId, helmetMake, helmetNumber, helmetSize] = helmetArray
        const updatedPlayer = {
            assignedEquipment: {
                helmet: `${helmetMake} ${helmetNumber} ${helmetSize}`
            }
        }
        props.editPlayer(playerId, updatedPlayer)
        props.getPlayers()
        setSelectedHelmet("")

        const updatedHelmet = {
            assigned: true
        }
        props.editHelmet(helmetId, updatedHelmet)
    }
    
    const helmets = props.player.assignedEquipment && props.player.assignedEquipment.helmet === "No Helmet Assigned" ?
        <>
        <select name="helmet" onChange={e => setSelectedHelmet(e.target.value)}>
            <option value="">-Select A Helmet-</option>
            {filteredHelmets.map(helmet => 
                <option key={helmet._id} value={`${helmet._id} ${helmet.make} ${helmet.helmetNumber} ${helmet.size}`}>{`${helmet.make}-${helmet.helmetNumber}-${helmet.size}`}</option>
            )}
        </select>
        <button onClick={() => handleAssignHelmet(props.player._id, selectedHelmet)}>Assign Helmet</button><button>Cancel</button>
        </>
        : props.player.assignedEquipment &&
        <>
        <p>{`${props.player.assignedEquipment.helmet}`}</p><button>Unassign Helmet</button>
        </>
    const shoulderpads = props.player.assignedEquipment && props.player.assignedEquipment.shoulderpads === "No Shoulderpads Assigned" &&
        <>
        <select name="shoulderpad" onChange={e => setSelectedShoulderpad(e.target.value)}>
            <option value="">-Select A Shoulder Pad-</option>
            {filteredShoulderpads.map(shoulderpad => 
                <option key={shoulderpad._id} value={`${shoulderpad.shoulderpadNumber}`}>{`${shoulderpad.make}-${shoulderpad.shoulderpadNumber}-${shoulderpad.size}`}</option>
            )}
        </select>
        <button>Assign Shoulder Pad</button><button>Cancel</button>
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
                    <h4>Helmet</h4>
                    <button>Assign Helmet</button>
                    {helmets}

                    <h4>Shoulder Pads</h4>
                    <button>Assign Shoulder Pads</button>
                    {shoulderpads}

                </div>
			</div>		
		</div>

    const sortedSeniorPlayers = props.roster.filter(
            player => player.grade === "Senior"
        )
        .sort(
            (a,b) => a.lastname.localeCompare(b.lastname)
        )
        .map(
            player => 
                <div key={player._id}>
                    <p>
                        {player.lastname.toUpperCase()} {player.firstname.toLowerCase()}
                    </p>
                    <p>
                        {player.grade.toUpperCase()}
                    </p>
                    <button onClick={() => props.getPlayerCardInfo(player._id)}>...</button>
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
                <div key={player._id}>
                    <p>
                        {player.lastname.toUpperCase()} {player.firstname.toLowerCase()}
                    </p>
                    <p>
                        {player.grade.toUpperCase()}
                    </p>
                    <button onClick={() => props.getPlayerCardInfo(player._id)}>...</button>
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
                <div key={player._id}>
                    <p>
                        {player.lastname.toUpperCase()} {player.firstname.toLowerCase()}
                    </p>
                    <p>
                        {player.grade.toUpperCase()}
                    </p>
                    <button onClick={() => props.getPlayerCardInfo(player._id)}>...</button>
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
                <div key={player._id}>
                    <p>
                        {player.lastname.toUpperCase()} {player.firstname.toLowerCase()}
                    </p>
                    <p>
                        {player.grade.toUpperCase()}
                    </p>
                    <button onClick={() => props.getPlayerCardInfo(player._id)}>...</button>
                </div>    
        )

    return (
        <div className="player-container">
            {sortedSeniorPlayers}
            {sortedJuniorPlayers}
            {sortedSophomorePlayers}
            {sortedFreshmanPlayers}
            {modal}
        </div>
    )
}

export default withContext(Player)