import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import { withContext } from "./AppContext"
import { Doughnut, Line, Bar, Bubble, Scatter, Polar } from "react-chartjs-2"
import "./UserHome.css"

const UserHome = props => {
    const {getPlayers, getHelmets, getShoulderpads} = props

    useEffect(() => {
        getPlayers()
    }, [getPlayers])
    useEffect(() => {
        getHelmets()
    }, [getHelmets])
    useEffect(() => {
        getShoulderpads()
    }, [getShoulderpads])

    const playersWithHelmets = props.players.filter(player => player.helmet !== "No Helmet Assigned").length
    const playersWithOutHelmets = props.players.filter(player => player.helmet === "No Helmet Assigned").length
    const dataHelmet = {
        labels: ["Players w/ Helmets", "Players w/o Helmets"],
        datasets: [
            {
                label: "Players",
                backgroundColor: ["rgba(103,255,102,0.8)", "rgba(191,174,178,0.8)"],
                data: [playersWithHelmets, playersWithOutHelmets]
            }
        ]
    }

    const playersWithShoulderpads = props.players.filter(player => player.shoulderpads !== "No Shoulderpads Assigned").length
    const playersWithOutShoulderpads = props.players.filter(player => player.shoulderpads === "No Shoulderpads Assigned").length
    const dataShoulderpad = {
        labels: ["Players w/ Shoulder Pads", "Players w/o Shoulder Pads"],
        datasets: [
            {
                label: "Players",
                backgroundColor: ["rgba(103,255,102,0.8)", "rgba(191,174,178,0.8)"],
                data: [playersWithShoulderpads, playersWithOutShoulderpads]
            }
        ]
    }

    const assignedHelmets = props.helmets.filter(helmet => helmet.assigned).length
    const totalHelmets = props.helmets.length
    const unassignedHelmets = totalHelmets - assignedHelmets
    const assignedSPads = props.shoulderpads.filter(spad => spad.assigned).length
    const totalSPads = props.shoulderpads.length
    const unassignedSPads = totalSPads - assignedSPads

    const dataHelmets = {
        labels: ["Total Helmets", "Assigned Helmets", "Unassigned Helmets"],
        datasets: [
            {
                label: "Helmets",
                backgroundColor: ["rgba(25,50,100,0.8)","rgba(103,255,102,0.8)","rgba(191,174,178,0.8)"],
                data: [totalHelmets, assignedHelmets, unassignedHelmets]
            }
        ]
    }
    const dataShoulderpads = {
        labels: ["Total Shoulder Pads", "Assigned Shoulder Pads", "Unassigned Shoulder Pads"],
        datasets: [
            {
                label: "Shoulder Pads",
                backgroundColor: ["rgba(25,50,100,0.8)","rgba(103,255,102,0.8)","rgba(191,174,178,0.8)"],
                data: [totalSPads, assignedSPads, unassignedSPads]
            }
        ]
    }
    const options = {
        legend: {
            display: false
        },
        animation: {
            animateScale: true
        },
        maintainAspectRatio: true
    }

    const [showDashboard, setShowDashboard] = useState(false)
    const handleDashboard = () => setShowDashboard(!showDashboard)
    const dashboardClass = showDashboard ? "" : "no-display"

    return (
        <div className="user-home-container">
            <h1>Welcome Home Coach {props.user.username.toUpperCase()}</h1>
            <button onClick={handleDashboard}>See Your Dashboard</button>
            <Link to="/roster">Roster</Link>
            <Link to="/inventory">Inventory</Link>
            <div className={`dashboard ${dashboardClass}`}>
                <button onClick={handleDashboard}>X</button>
                <h3>Players With Helmets</h3>
                <hr/>
                <Polar data={dataHelmet} options={options}/>
                <h3>Players With Shoulder Pads</h3>
                <hr/>
                <Polar data={dataShoulderpad} options={options}/>
                <h3>Helmets Assigned</h3>
                <hr/>
                <Line data={dataHelmets} options={options}/>
                <h3>Shoulder Pads Assigned</h3>
                <hr/>
                <Polar data={dataShoulderpads} options={options}/>
            </div>
        </div>
    )
}

export default withContext(UserHome)