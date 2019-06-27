import React, { useState } from "react"
import { withContext } from "../AppContext";
import "./AddPlayerForm.css"

const AddPlayerForm = props => {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [grade, setGrade] = useState("Senior")
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

    const clearState = () => {
        setFirstname("")
        setLastname("")
        setGrade("Senior")
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

        let newPlayer = {
            lastname,
            firstname,
            grade,
            position: playerPositions
        }
        props.addPlayer(newPlayer)

        clearState()
        newPlayer = {}
        playerPositions = []
        
        props.handleAddPlayerModal()
        props.getPlayers()
    }

    const submitNewPlayer = firstname !== "" && lastname !== "" && grade !== "" ?
        <div className="add-btn-container"><button className="add-btn">Add {firstname} {lastname} to Roster</button></div>
        :
        <h3 style={{color: "red", textAlign: "center", padding: "8pt 0"}}>Required: First Name, Last Name and Grade</h3>

    return (
        <form name="addPlayerForm" className="add-player-form-container" onSubmit={handleSubmit}>
            <div className="close-btn-container" onClick={handleModalLogic}>
                <p className="close-btn">X</p>
            </div>
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
                <h2>Grade <span>*Senior selected by default</span></h2>
                <label>
                    <input 
                        id="grade-input"
                        type="radio"
                        name="grade"
                        value="Senior"
                        checked={grade === "Senior"}
                        onChange={e => setGrade(e.target.value)}
                    /> Senior
                </label> 
                <label>
                    <input 
                        type="radio"
                        name="grade"
                        value="Junior"
                        checked={grade === "Junior"}
                        onChange={e => setGrade(e.target.value)}
                    /> Junior
                </label>
                <label>
                    <input 
                        type="radio"
                        name="grade"
                        value="Sophomore"
                        checked={grade === "Sophomore"}
                        onChange={e => setGrade(e.target.value)}
                    /> Sophomore
                </label>
                <label>
                    <input 
                        type="radio"
                        name="grade"
                        value="Freshman"
                        checked={grade === "Freshman"}
                        onChange={e => setGrade(e.target.value)}
                    /> Freshman
                </label>
            </div>
            <h2 className="position-title">Position(s) <span>select all that apply</span></h2>
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
            {submitNewPlayer}
        </form>
    )
}

export default withContext(AddPlayerForm)