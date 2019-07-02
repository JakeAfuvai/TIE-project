import React, { useState, useEffect } from "react"
import { ReactComponent as Helmet } from "../images/helmets.svg"
import { ReactComponent as ShPad } from "../images/spads.svg"
import { withContext } from "../AppContext"
import Fade from "react-reveal/Fade"
import "./Player.css"

const Player = props => {
    const {getHelmets, getShoulderpads} = props
    useEffect(() => {
        getHelmets()
    }, [getHelmets])

    useEffect(() => {
        getShoulderpads()
    }, [getShoulderpads])

    const [lastname, setLastname] = useState("")
    const [firstname, setFirstname] = useState("")
    const [grade, setGrade] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [selectedHelmet, setSelectedHelmet] = useState("")
    const [selectedShoulderpad, setSelectedShoulderpad] = useState("")
    const [ol, setol] = useState(false)
    const [qb, setqb] = useState(false)
    const [rb, setrb] = useState(false)
    const [te, sette] = useState(false)
    const [wr, setwr] = useState(false)
    const [dl, setdl] = useState(false)
    const [lb, setlb] = useState(false)
    const [db, setdb] = useState(false)
    const [ls, setls] = useState(false)
    const [k, setk] = useState(false)
    const [p, setp] = useState(false)
    const [showPModal, setShowPModal] = useState(false)
    const [showHModal, setShowHModal] = useState(false)
    const [showSPModal, setShowSPModal] = useState(false)

    const olStyle = ol ? {background: "limegreen", transition: "0.3s"} : null
    const qbStyle = qb ? {background: "limegreen", transition: "0.3s"} : null
    const rbStyle = rb ? {background: "limegreen", transition: "0.3s"} : null
    const teStyle = te ? {background: "limegreen", transition: "0.3s"} : null
    const wrStyle = wr ? {background: "limegreen", transition: "0.3s"} : null
    const dlStyle = dl ? {background: "limegreen", transition: "0.3s"} : null
    const lbStyle = lb ? {background: "limegreen", transition: "0.3s"} : null
    const dbStyle = db ? {background: "limegreen", transition: "0.3s"} : null
    const lsStyle = ls ? {background: "limegreen", transition: "0.3s"} : null
    const kStyle = k ? {background: "limegreen", transition: "0.3s"} : null
    const pStyle = p ? {background: "limegreen", transition: "0.3s"} : null

    const editModeSetter = ({lastname, firstname, grade, position}) => {
        setEditMode(!editMode)
        setLastname(lastname)
        setFirstname(firstname)
        setGrade(grade)
        clearPositions()
        position.includes("OL") && setol(true)
        position.includes("QB") && setqb(true)
        position.includes("RB") && setrb(true)
        position.includes("TE") && sette(true)
        position.includes("WR") && setwr(true)
        position.includes("DL") && setdl(true)
        position.includes("LB") && setlb(true)
        position.includes("DB") && setdb(true)
        position.includes("LS") && setls(true)
        position.includes("K") && setk(true)
        position.includes("P") && setp(true)
    }

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
    // maybe add some timeout/suspense to let these functions run full course 
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
        <button onClick={() => {handleAssignHelmet(props.player._id, props.player.lastname, props.player.firstname, props.player.shoulderpads, selectedHelmet); setShowHModal(!showHModal)}}>Assign Helmet</button>
        </>
        : props.player.helmet &&
        <>
        <p>{`${props.player.helmet}`}</p><button onClick={() => {handleUnassignHelmet(props.player._id, props.player.shoulderpads, props.player.helmet); setShowHModal(!showHModal)}}>Unassign Helmet</button>
        </>


    const shoulderpads = props.player.shoulderpads && props.player.shoulderpads === "No Shoulderpads Assigned" ?
        <>
        <select name="shoulderpad" onChange={e => setSelectedShoulderpad(e.target.value)}>
            <option value="">-Select A Shoulder Pad-</option>
            {filteredShoulderpads.map(shoulderpad => 
                <option key={shoulderpad._id} value={`${shoulderpad._id} ${shoulderpad.make} ${shoulderpad.shoulderpadNumber} ${shoulderpad.size}`}>{`${shoulderpad.make}-${shoulderpad.shoulderpadNumber}-${shoulderpad.size}`}</option>
            )}
        </select>
        <button onClick={() => {handleAssignShoulderpad(props.player._id, props.player.lastname, props.player.firstname, props.player.helmet, selectedShoulderpad); setShowSPModal(!showSPModal)}}>Assign Shoulder Pad</button>
        </>
        : props.player.shoulderpads &&
        <>
        <p>{`${props.player.shoulderpads}`}</p><button onClick={() => {handleUnassignShoulderpad(props.player._id, props.player.helmet, props.player.shoulderpads); setShowSPModal(!showSPModal)}}>Unassign Shoulder Pads</button>
        </>



    const showPositions = props.player.position && props.player.position.length > 0 ?
        props.player.position.map((position, i) => <li key={props.player._id + i}>{position}</li>)
        : 
        `No Assigned Positions for ${props.player.firstname}`
    const closePlayerCardAndEdit = playerId => {
        props.closePlayerCardInfo(playerId)
        setEditMode(false)
        setShowPModal(!showPModal)
    }
    const clearState = () => {
        setFirstname("")
        setLastname("")
        setGrade("")
        setol(false)
        setqb(false)
        setrb(false)
        sette(false)
        setwr(false)
        setdl(false)
        setlb(false)
        setdb(false)
        setls(false)
        setk(false)
        setp(false)
    }
    const clearPositions = () => {
        setol(false)
        setqb(false)
        setrb(false)
        sette(false)
        setwr(false)
        setdl(false)
        setlb(false)
        setdb(false)
        setls(false)
        setk(false)
        setp(false)
    }
    const handlePlayerEdits = (playerPosition, playerId) => {
        // let playerPositions = [...playerPosition] 
        let playerPositions = []
        ol && playerPositions.push("OL") 
        qb && playerPositions.push("QB")
        rb && playerPositions.push("RB")
        te && playerPositions.push("TE")
        wr && playerPositions.push("WR")
        dl && playerPositions.push("DL")
        lb && playerPositions.push("LB")
        db && playerPositions.push("DB")
        ls && playerPositions.push("LS")
        k && playerPositions.push("K")
        p && playerPositions.push("P")
        
        // to prevent duplicate values
        // let filteredPositions = playerPositions.filter((position, i, positions) => positions.indexOf(position) === i)

        let updatedPlayer = {
            lastname,
            firstname,
            grade,
            // position: filteredPositions
            position: playerPositions
        }
        props.editPlayer(playerId, updatedPlayer)

        clearState()
        updatedPlayer = {}
        playerPositions = []
        
        closePlayerCardAndEdit(playerId)
        props.getPlayers()
    }

    const modal = props.player.showModal && 
		<div className="outer-modal">
			<div className="modal-show">
				<button onClick={() => closePlayerCardAndEdit(props.player._id)}>X</button>
                <button onClick={() => editModeSetter(props.player)}>{!editMode ? "Edit Player Info" : "Cancel Changes"}</button>
                {!editMode ?
                <>
				<h1>{props.player.lastname.toUpperCase()} {props.player.firstname.toLowerCase()}</h1>
				<h2>Grade: {props.player.grade}</h2>
                <div>{props.player.position.length > 1 ? "Positions" : "Position"}: {showPositions}</div>
                </>
                :
                <>
                <h1>{props.player.lastname.toUpperCase()} {props.player.firstname.toLowerCase()}</h1>
                <input type="text" name="lastname" value={lastname} onChange={e=>setLastname(e.target.value)} placeholder={props.player.lastname}/>
                <input type="text" name="firstname" value={firstname} onChange={e=>setFirstname(e.target.value)} placeholder={props.player.firstname}/>
				<h2>Grade: {props.player.grade}</h2>
                <label><input type="radio" name="grade" value="Senior" checked={grade === "Senior"}onChange={e => setGrade(e.target.value)}/> Senior</label>
                <label><input type="radio" name="grade" value="Junior" checked={grade === "Junior"}onChange={e => setGrade(e.target.value)}/> Junior</label>
                <label><input type="radio" name="grade" value="Sophomore" checked={grade === "Sophomore"}onChange={e => setGrade(e.target.value)}/> Sophomore</label>
                <label><input type="radio" name="grade" value="Freshman" checked={grade === "Freshman"}onChange={e => setGrade(e.target.value)}/> Freshman</label>
                <div>{props.player.position.length > 1 ? "Positions" : "Position"}: {showPositions}</div>
                <div className="position-container">
                    <h4 id="offense">OFFENSE</h4>
                    <div
                        id="ol"
                        style={olStyle}
                        onClick={() => setol(!ol)}
                    >OL</div>
                    <div
                        id="qb"
                        style={qbStyle}
                        onClick={() => setqb(!qb)}
                    >QB</div>
                    <div
                        id="rb"
                        style={rbStyle}
                        onClick={() => setrb(!rb)}
                    >RB</div>
                    <div
                        id="te"
                        style={teStyle}
                        onClick={() => sette(!te)}
                    >TE</div>
                    <div
                        id="wr"
                        style={wrStyle}
                        onClick={() => setwr(!wr)}
                    >WR</div>
                    <h4 id="defense">DEFENSE</h4>
                    <div
                        id="dl"
                        style={dlStyle}
                        onClick={() => setdl(!dl)}
                    >DL</div>
                    <div
                        id="lb"
                        style={lbStyle}
                        onClick={() => setlb(!lb)}
                    >LB</div>
                    <div
                        id="db"
                        style={dbStyle}
                        onClick={() => setdb(!db)}
                    >DB</div>
                    <h4 id="special-teams">SPECIAL TEAMS</h4>
                    <div
                        id="ls"
                        style={lsStyle}
                        onClick={() => setls(!ls)}
                    >LS</div>
                    <div
                        id="k"
                        style={kStyle}
                        onClick={() => setk(!k)}
                    >K</div>
                    <div
                        id="p"
                        style={pStyle}
                        onClick={() => setp(!p)}
                    >P</div>
                </div>

                <button onClick={() => handlePlayerEdits(props.player.position, props.player._id)}>Submit Changes</button>
                </>
                }
                <div className="player-equipment-container">
                    <h2 className="equip-title">Equipment</h2>
                    <Helmet className="helmet-icon" height="9vh" />
                    <h3 className="player-helmet">{props.player.helmet}</h3>
                    <ShPad className="sp-icon" height="9vh" />
                    <h3 className="player-sp">{props.player.shoulderpads}</h3>
                </div>
			</div>	
		</div>
        // helmet assign modal
        const helmetAssignModal = props.player.showHelmetModal &&
            <div className="outer-modal">
                <div className="modal-show">
                    <button onClick={() => {props.closeHelmetAssignCard(props.player._id); setShowHModal(!showHModal)}}>X</button>
                    <h1>{props.player.lastname.toUpperCase()} {props.player.firstname.toLowerCase()}</h1>
                    <h3>Helmet</h3>
                    {helmets}
                </div>
            </div>
        // shoulderpad assign modal
        const shoulderpadAssignModal = props.player.showShoulderpadModal &&
            <div className="outer-modal">
                <div className="modal-show">
                    <button onClick={() => {props.closeShoulderpadAssignCard(props.player._id); setShowSPModal(!showSPModal)}}>X</button>
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
                    <Helmet className="helmet" height="4vh" style={player.helmet === "No Helmet Assigned" ? {fill: "slategray", opacity: 0.65} : {fill: "limegreen"}} onClick={() => {props.getHelmetAssignCard(player._id); setShowHModal(!showHModal)}}/>
                    <ShPad className="shoulderpads" height="4vh" style={player.shoulderpads === "No Shoulderpads Assigned" ? {fill: "slategray", opacity: 0.65} : {fill: "limegreen"}} onClick={() => {props.getShoulderpadAssignCard(player._id); setShowSPModal(!showPModal)}}/>
                    <button className="see-more-btn" onClick={() => {props.getPlayerCardInfo(player._id); setShowPModal(!showPModal)}}>. . .</button>
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
                    <Helmet className="helmet" height="4vh" style={player.helmet === "No Helmet Assigned" ? {fill: "slategray", opacity: 0.65} : {fill: "limegreen"}} onClick={() => {props.getHelmetAssignCard(player._id); setShowHModal(!showHModal)}}/>
                    <ShPad className="shoulderpads" height="4vh" style={player.shoulderpads === "No Shoulderpads Assigned" ? {fill: "slategray", opacity: 0.65} : {fill: "limegreen"}} onClick={() => {props.getShoulderpadAssignCard(player._id); setShowSPModal(!showSPModal)}}/>
                    <button className="see-more-btn" onClick={() => {props.getPlayerCardInfo(player._id); setShowPModal(!showPModal)}}>. . .</button>
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
                    <Helmet className="helmet" height="4vh" style={player.helmet === "No Helmet Assigned" ? {fill: "slategray", opacity: 0.65} : {fill: "limegreen"}} onClick={() => {props.getHelmetAssignCard(player._id); setShowHModal(!showHModal)}}/>
                    <ShPad className="shoulderpads" height="4vh" style={player.shoulderpads === "No Shoulderpads Assigned" ? {fill: "slategray", opacity: 0.65} : {fill: "limegreen"}} onClick={() => {props.getShoulderpadAssignCard(player._id); setShowSPModal(!showSPModal)}}/>
                    <button className="see-more-btn" onClick={() => {props.getPlayerCardInfo(player._id); setShowPModal(!showPModal)}}>. . .</button>
                </div>    
        )
        const sortedFreshmanPlayers = props.roster.filter(
            player => player.grade === "Freshman"
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
                    <Helmet className="helmet" height="4vh" style={player.helmet === "No Helmet Assigned" ? {fill: "slategray", opacity: 0.65} : {fill: "limegreen"}} onClick={() => {props.getHelmetAssignCard(player._id); setShowHModal(!showHModal)}}/>
                    <ShPad className="shoulderpads" height="4vh" style={player.shoulderpads === "No Shoulderpads Assigned" ? {fill: "slategray", opacity: 0.65} : {fill: "limegreen"}} onClick={() => {props.getShoulderpadAssignCard(player._id);; setShowSPModal(!showSPModal)}}/>
                    <button className="see-more-btn" onClick={() => {props.getPlayerCardInfo(player._id); setShowPModal(!showPModal)}}>. . .</button>
                </div>    
        )

        

    return (
        <div className="player-container">
            {sortedSeniorPlayers}
            {sortedJuniorPlayers}
            {sortedSophomorePlayers}
            {sortedFreshmanPlayers}
            <Fade top opposite when={showPModal}>
            {modal}
            </Fade>
            <Fade top opposite when={showHModal}>
            {helmetAssignModal}
            </Fade>
            <Fade top opposite when={showSPModal}>
            {shoulderpadAssignModal} 
            </Fade>
        </div>
    )
}

export default withContext(Player)