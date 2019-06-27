import React, { useState } from "react"
import { withContext } from "../AppContext";
import "./AddPlayerForm.css"

const AddPlayerForm = props => {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [grade, setGrade] = useState("Senior")
    const [position, setPosition] = useState([])
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

    const olStyle = ol ? {background: "limegreen"} : null
    const qbStyle = qb ? {background: "limegreen"} : null
    const rbStyle = rb ? {background: "limegreen"} : null
    const teStyle = te ? {background: "limegreen"} : null
    const wrStyle = wr ? {background: "limegreen"} : null
    const dlStyle = dl ? {background: "limegreen"} : null
    const lbStyle = lb ? {background: "limegreen"} : null
    const dbStyle = db ? {background: "limegreen"} : null
    const lsStyle = ls ? {background: "limegreen"} : null
    const kStyle = k ? {background: "limegreen"} : null
    const pStyle = p ? {background: "limegreen"} : null

    const clearState = () => {
        setFirstname("")
        setLastname("")
        setGrade("Senior")
        setPosition([])
    }

    const handleModalLogic = () => {
        props.handleAddPlayerModal()
        clearState()
    }

    const handleSubmit = e => {
        e.preventDefault()
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
        
        console.log(playerPositions, position)

        //why not setting state????????????
        setPosition(playerPositions)
        console.log(position)

        let newPlayer = {
            lastname,
            firstname,
            grade,
            position: playerPositions
        }
        props.addPlayer(newPlayer)
        console.log(firstname, lastname, grade, position, newPlayer)

        clearState()
        newPlayer = {}
        playerPositions = []
        console.log(firstname, lastname, grade, position, newPlayer)
        
        props.handleAddPlayerModal()
        props.getPlayers()
    }

    const submitNewPlayer = firstname !== "" && lastname !== "" && grade !== "" ?
        <button>Add {firstname} {lastname} to Roster</button>
        :
        <h3>Enter at Least First Name, Last Name and Grade to Submit Player to Roster</h3>

    return (
        <form name="addPlayerForm" className="add-player-form-container" onSubmit={handleSubmit}>
            <div onClick={handleModalLogic}>X</div>
            <div className="player-name-container">
                <h2>Player Name</h2>
                <input 
                    id="firstname-input"
                    type="text"
                    name="firstname"
                    value={firstname}
                    placeholder="First Name..."
                    onChange={e => setFirstname(e.target.value)}
                    minLength={2}
                />
                <input 
                    id="lastname-input"
                    type="text"
                    name="lastname"
                    value={lastname}
                    placeholder="Last Name..."
                    onChange={e => setLastname(e.target.value)}
                    minLength={2}
                />
            </div>
            <div className="radio-container">
                <h2>Grade</h2>
                <label>Senior
                    <input 
                        id="grade-input"
                        type="radio"
                        name="grade"
                        value="Senior"
                        checked={grade === "Senior"}
                        onChange={e => setGrade(e.target.value)}
                    />
                </label>
                <label>Junior
                    <input 
                        type="radio"
                        name="grade"
                        value="Junior"
                        checked={grade === "Junior"}
                        onChange={e => setGrade(e.target.value)}
                    />
                </label>
                <label>Sophomore
                    <input 
                        type="radio"
                        name="grade"
                        value="Sophomore"
                        checked={grade === "Sophomore"}
                        onChange={e => setGrade(e.target.value)}
                    />
                </label>
                <label>Freshman
                    <input 
                        type="radio"
                        name="grade"
                        value="Freshman"
                        checked={grade === "Freshman"}
                        onChange={e => setGrade(e.target.value)}
                    />
                </label>
            </div>
            <div className="position-container">
                <h4>OFFENSE</h4>
                <div
                    style={olStyle}
                    onClick={() => setol(!ol)}
                >OL</div>
                <div
                    style={qbStyle}
                    onClick={() => setqb(!qb)}
                >QB</div>
                <div
                    style={rbStyle}
                    onClick={() => setrb(!rb)}
                >RB</div>
                <div
                    style={teStyle}
                    onClick={() => sette(!te)}
                >TE</div>
                <div
                    style={wrStyle}
                    onClick={() => setwr(!wr)}
                >WR</div>
                <h4>DEFENSE</h4>
                <div
                    style={dlStyle}
                    onClick={() => setdl(!dl)}
                >DL</div>
                <div
                    style={lbStyle}
                    onClick={() => setlb(!lb)}
                >LB</div>
                <div
                    style={dbStyle}
                    onClick={() => setdb(!db)}
                >DB</div>
                <h4>SPECIAL TEAMS</h4>
                <div
                    style={lsStyle}
                    onClick={() => setls(!ls)}
                >LS</div>
                <div
                    style={kStyle}
                    onClick={() => setk(!k)}
                >K</div>
                <div
                    style={pStyle}
                    onClick={() => setp(!p)}
                >P</div>
            </div>
            {submitNewPlayer}
        </form>
    )
}

export default withContext(AddPlayerForm)