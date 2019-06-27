import React from "react"
import { withContext } from "../AppContext"
import "./Player.css"

const Player = props => {
    const showPositions = props.player.position && props.player.position.length > 0 ?
        props.player.position.map((position, i) => <li key={props.player._id + i}>{position}</li>)
        : 
        `No Assigned Positions for ${props.player.firstname}`
    const modal = props.player.showModal && 
		<div className="outer-modal">
			<div className="modal-show">
				<button onClick={() => props.closePlayerCardInfo(props.player._id)}>X</button>
				<h1>{props.player.lastname.toUpperCase()} {props.player.firstname.toLowerCase()}</h1>
				<h2>Grade: {props.player.grade}</h2>
                <div>{props.player.position.length > 1 ? "Positions" : "Position"}: {showPositions}</div>
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