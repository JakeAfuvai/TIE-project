import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import { withContext } from "./AppContext"
import { Line, Polar, Bar, Doughnut } from "react-chartjs-2"
import Fade from "react-reveal/Fade"
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

    // Players by Grade data
    const seniors = props.players.filter(player=>player.grade==="Senior").length
    const juniors = props.players.filter(player=>player.grade==="Junior").length
    const sophomores = props.players.filter(player=>player.grade==="Sophomore").length
    const freshman = props.players.filter(player=>player.grade==="Freshman").length
    const dataPlayersByGrade = {
        labels: ["Seniors", "Juniors", "Sophomores", "Freshmen"],
        datasets: [
            {
                label: "Players",
                backgroundColor: ["rgba(103,255,102,0.8)","rgba(170,120,88,0.8)","rgba(225,50,65,0.8)","rgba(191,174,178,0.8)"],
                data: [seniors, juniors, sophomores, freshman]
            }
        ]
    }

    // This block is for dashboard chart breakdown of positions and positions by Grade
    const olCount = props.players.filter(player=>player.position.find(pos=>pos==="OL")).length
    const OLSenior = props.players.filter(player=>player.grade==="Senior"&&player.position.find(pos=>pos==="OL")).length
    const OLJunior = props.players.filter(player=>player.grade==="Junior"&&player.position.find(pos=>pos==="OL")).length
    const OLSophomore = props.players.filter(player=>player.grade==="Sophomore"&&player.position.find(pos=>pos==="OL")).length
    const OLFreshman = props.players.filter(player=>player.grade==="Freshman"&&player.position.find(pos=>pos==="OL")).length
    const qbCount = props.players.filter(player=>player.position.find(pos=>pos==="QB")).length
    const QBSenior = props.players.filter(player=>player.grade==="Senior"&&player.position.find(pos=>pos==="QB")).length
    const QBJunior = props.players.filter(player=>player.grade==="Junior"&&player.position.find(pos=>pos==="QB")).length
    const QBSophomore = props.players.filter(player=>player.grade==="Sophomore"&&player.position.find(pos=>pos==="QB")).length
    const QBFreshman = props.players.filter(player=>player.grade==="Freshman"&&player.position.find(pos=>pos==="QB")).length
    const rbCount = props.players.filter(player=>player.position.find(pos=>pos==="RB")).length
    const RBSenior = props.players.filter(player=>player.grade==="Senior"&&player.position.find(pos=>pos==="RB")).length
    const RBJunior = props.players.filter(player=>player.grade==="Junior"&&player.position.find(pos=>pos==="RB")).length
    const RBSophomore = props.players.filter(player=>player.grade==="Sophomore"&&player.position.find(pos=>pos==="RB")).length
    const RBFreshman = props.players.filter(player=>player.grade==="Freshman"&&player.position.find(pos=>pos==="RB")).length
    const teCount = props.players.filter(player=>player.position.find(pos=>pos==="TE")).length
    const TESenior = props.players.filter(player=>player.grade==="Senior"&&player.position.find(pos=>pos==="TE")).length
    const TEJunior = props.players.filter(player=>player.grade==="Junior"&&player.position.find(pos=>pos==="TE")).length
    const TESophomore = props.players.filter(player=>player.grade==="Sophomore"&&player.position.find(pos=>pos==="TE")).length
    const TEFreshman = props.players.filter(player=>player.grade==="Freshman"&&player.position.find(pos=>pos==="TE")).length
    const wrCount = props.players.filter(player=>player.position.find(pos=>pos==="WR")).length
    const WRSenior = props.players.filter(player=>player.grade==="Senior"&&player.position.find(pos=>pos==="WR")).length
    const WRJunior = props.players.filter(player=>player.grade==="Junior"&&player.position.find(pos=>pos==="WR")).length
    const WRSophomore = props.players.filter(player=>player.grade==="Sophomore"&&player.position.find(pos=>pos==="WR")).length
    const WRFreshman = props.players.filter(player=>player.grade==="Freshman"&&player.position.find(pos=>pos==="WR")).length
    const dlCount = props.players.filter(player=>player.position.find(pos=>pos==="DL")).length
    const DLSenior = props.players.filter(player=>player.grade==="Senior"&&player.position.find(pos=>pos==="DL")).length
    const DLJunior = props.players.filter(player=>player.grade==="Junior"&&player.position.find(pos=>pos==="DL")).length
    const DLSophomore = props.players.filter(player=>player.grade==="Sophomore"&&player.position.find(pos=>pos==="DL")).length
    const DLFreshman = props.players.filter(player=>player.grade==="Freshman"&&player.position.find(pos=>pos==="DL")).length
    const lbCount = props.players.filter(player=>player.position.find(pos=>pos==="LB")).length
    const LBSenior = props.players.filter(player=>player.grade==="Senior"&&player.position.find(pos=>pos==="LB")).length
    const LBJunior = props.players.filter(player=>player.grade==="Junior"&&player.position.find(pos=>pos==="LB")).length
    const LBSophomore = props.players.filter(player=>player.grade==="Sophomore"&&player.position.find(pos=>pos==="LB")).length
    const LBFreshman = props.players.filter(player=>player.grade==="Freshman"&&player.position.find(pos=>pos==="LB")).length
    const dbCount = props.players.filter(player=>player.position.find(pos=>pos==="DB")).length
    const DBSenior = props.players.filter(player=>player.grade==="Senior"&&player.position.find(pos=>pos==="DB")).length
    const DBJunior = props.players.filter(player=>player.grade==="Junior"&&player.position.find(pos=>pos==="DB")).length
    const DBSophomore = props.players.filter(player=>player.grade==="Sophomore"&&player.position.find(pos=>pos==="DB")).length
    const DBFreshman = props.players.filter(player=>player.grade==="Freshman"&&player.position.find(pos=>pos==="DB")).length
    const lsCount = props.players.filter(player=>player.position.find(pos=>pos==="LS")).length
    const LSSenior = props.players.filter(player=>player.grade==="Senior"&&player.position.find(pos=>pos==="LS")).length
    const LSJunior = props.players.filter(player=>player.grade==="Junior"&&player.position.find(pos=>pos==="LS")).length
    const LSSophomore = props.players.filter(player=>player.grade==="Sophomore"&&player.position.find(pos=>pos==="LS")).length
    const LSFreshman = props.players.filter(player=>player.grade==="Freshman"&&player.position.find(pos=>pos==="LS")).length
    const kCount = props.players.filter(player=>player.position.find(pos=>pos==="K")).length
    const KSenior = props.players.filter(player=>player.grade==="Senior"&&player.position.find(pos=>pos==="K")).length
    const KJunior = props.players.filter(player=>player.grade==="Junior"&&player.position.find(pos=>pos==="K")).length
    const KSophomore = props.players.filter(player=>player.grade==="Sophomore"&&player.position.find(pos=>pos==="K")).length
    const KFreshman = props.players.filter(player=>player.grade==="Freshman"&&player.position.find(pos=>pos==="K")).length
    const pCount = props.players.filter(player=>player.position.find(pos=>pos==="P")).length
    const PSenior = props.players.filter(player=>player.grade==="Senior"&&player.position.find(pos=>pos==="P")).length
    const PJunior = props.players.filter(player=>player.grade==="Junior"&&player.position.find(pos=>pos==="P")).length
    const PSophomore = props.players.filter(player=>player.grade==="Sophomore"&&player.position.find(pos=>pos==="P")).length
    const PFreshman = props.players.filter(player=>player.grade==="Freshman"&&player.position.find(pos=>pos==="P")).length
    const dataOL = {
        labels: ["OL", "Senior OL", "Junior OL", "Sophomore OL", "Freshmen OL"],
        datasets: [
            {
                label: "Total OL",
                backgroundColor: ["rgba(24,67,250,0.8)","rgba(103,255,102,0.8)","rgba(170,120,88,0.8)","rgba(225,50,65,0.8)","rgba(191,174,178,0.8)"],
                data: [olCount, OLSenior, OLJunior, OLSophomore, OLFreshman]
            }
        ]
    }
    const dataQB = {
        labels: ["QB", "Senior QB", "Junior QB", "Sophomore QB", "Freshmen QB"],
        datasets: [
            {
                label: "Total QB",
                backgroundColor: ["rgba(24,67,250,0.8)","rgba(103,255,102,0.8)","rgba(170,120,88,0.8)","rgba(225,50,65,0.8)","rgba(191,174,178,0.8)"],
                data: [qbCount, QBSenior, QBJunior, QBSophomore, QBFreshman]
            }
        ]
    }
    const dataRB = {
        labels: ["RB", "Senior RB", "Junior RB", "Sophomore RB", "Freshmen RB"],
        datasets: [
            {
                label: "Total RB",
                backgroundColor: ["rgba(24,67,250,0.8)","rgba(103,255,102,0.8)","rgba(170,120,88,0.8)","rgba(225,50,65,0.8)","rgba(191,174,178,0.8)"],
                data: [rbCount, RBSenior, RBJunior, RBSophomore, RBFreshman]
            }
        ]
    }
    const dataTE = {
        labels: ["TE", "Senior TE", "Junior TE", "Sophomore TE", "Freshmen TE"],
        datasets: [
            {
                label: "Total TE",
                backgroundColor: ["rgba(24,67,250,0.8)","rgba(103,255,102,0.8)","rgba(170,120,88,0.8)","rgba(225,50,65,0.8)","rgba(191,174,178,0.8)"],
                data: [teCount, TESenior, TEJunior, TESophomore, TEFreshman]
            }
        ]
    }
    const dataWR = {
        labels: ["WR", "Senior WR", "Junior WR", "Sophomore WR", "Freshmen WR"],
        datasets: [
            {
                label: "Total WR",
                backgroundColor: ["rgba(24,67,250,0.8)","rgba(103,255,102,0.8)","rgba(170,120,88,0.8)","rgba(225,50,65,0.8)","rgba(191,174,178,0.8)"],
                data: [wrCount, WRSenior, WRJunior, WRSophomore, WRFreshman]
            }
        ]
    }
    const dataDL = {
        labels: ["DL", "Senior DL", "Junior DL", "Sophomore DL", "Freshmen DL"],
        datasets: [
            {
                label: "Total DL",
                backgroundColor: ["rgba(24,67,250,0.8)","rgba(103,255,102,0.8)","rgba(170,120,88,0.8)","rgba(225,50,65,0.8)","rgba(191,174,178,0.8)"],
                data: [dlCount, DLSenior, DLJunior, DLSophomore, DLFreshman]
            }
        ]
    }
    const dataLB = {
        labels: ["LB", "Senior LB", "Junior LB", "Sophomore LB", "Freshmen LB"],
        datasets: [
            {
                label: "Total LB",
                backgroundColor: ["rgba(24,67,250,0.8)","rgba(103,255,102,0.8)","rgba(170,120,88,0.8)","rgba(225,50,65,0.8)","rgba(191,174,178,0.8)"],
                data: [lbCount, LBSenior, LBJunior, LBSophomore, LBFreshman]
            }
        ]
    }
    const dataDB = {
        labels: ["DB", "Senior DB", "Junior DB", "Sophomore DB", "Freshmen DB"],
        datasets: [
            {
                label: "Total DB",
                backgroundColor: ["rgba(24,67,250,0.8)","rgba(103,255,102,0.8)","rgba(170,120,88,0.8)","rgba(225,50,65,0.8)","rgba(191,174,178,0.8)"],
                data: [dbCount, DBSenior, DBJunior, DBSophomore, DBFreshman]
            }
        ]
    }
    const dataLS = {
        labels: ["LS", "Senior LS", "Junior LS", "Sophomore LS", "Freshmen LS"],
        datasets: [
            {
                label: "Total LS",
                backgroundColor: ["rgba(24,67,250,0.8)","rgba(103,255,102,0.8)","rgba(170,120,88,0.8)","rgba(225,50,65,0.8)","rgba(191,174,178,0.8)"],
                data: [lsCount, LSSenior, LSJunior, LSSophomore, LSFreshman]
            }
        ]
    }
    const dataK = {
        labels: ["K", "Senior K", "Junior K", "Sophomore K", "Freshmen K"],
        datasets: [
            {
                label: "Total K",
                backgroundColor: ["rgba(24,67,250,0.8)","rgba(103,255,102,0.8)","rgba(170,120,88,0.8)","rgba(225,50,65,0.8)","rgba(191,174,178,0.8)"],
                data: [kCount, KSenior, KJunior, KSophomore, KFreshman]
            }
        ]
    }
    const dataP = {
        labels: ["P", "Senior P", "Junior P", "Sophomore P", "Freshmen P"],
        datasets: [
            {
                label: "Total P",
                backgroundColor: ["rgba(24,67,250,0.8)","rgba(103,255,102,0.8)","rgba(170,120,88,0.8)","rgba(225,50,65,0.8)","rgba(191,174,178,0.8)"],
                data: [pCount, PSenior, PJunior, PSophomore, PFreshman]
            }
        ]
    }
    // Position Breakdown
    const dataPositions = {
        labels: [
            "OL", "QB", "RB", "TE", "WR",
            "DL", "LB", "DB",
            "LS", "K", "P"
        ],
        datasets: [
            {
                label: "Players",
                backgroundColor: ["rgba(26,82,118,0.8)","rgba(46,134,193,0.8)","rgba(41, 128, 185,0.8)","rgba(93, 173, 226,0.8)","rgba(127, 179, 213,0.8)",
                
                "rgba(176, 58, 46 ,0.8)","rgba(176, 58, 46 ,0.8)","rgba(205, 97, 85,0.8)",

                "rgba(29, 131, 72 ,0.8)","rgba(39, 174, 96,0.8)","rgba(171, 235, 198,0.8)"
                ],
                data: [olCount,qbCount,rbCount,teCount,wrCount,dlCount,lbCount,dbCount,lsCount,kCount,pCount,]
            }
        ]
    }

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
            display: true
        },
        animation: {
            animateScale: true,
            duration: 3500
        },
        maintainAspectRatio: true
    }

    const [showDashboard, setShowDashboard] = useState(false)
    const [showRosterDashboard, setShowRosterDashboard] = useState(false)
    const handleDashboard = () => setShowDashboard(!showDashboard)
    const handleRosterDashboard = () => setShowRosterDashboard(!showRosterDashboard)
    const dashboardClass = showDashboard ? "" : "no-display"
    const rosterDashboardClass = showRosterDashboard ? "" : "no-display"

    return (
        <div className="user-home-container">
            <h1>Welcome Home Coach {props.user.username.toUpperCase()}</h1>
            <button onClick={handleRosterDashboard}>See Roster Dashboard</button>
            <Link to="/roster">Roster</Link>
            <button onClick={handleDashboard}>See Inventory Dashboard</button>
            <Link to="/inventory">Inventory</Link>
            <Fade left when={showDashboard}>
            <div className={`outer-dashboard ${dashboardClass}`}>
                <Fade left cascade when={showDashboard}>
                <div className={`dashboard`}>
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
                </Fade>
            </div>
            </Fade>
            <Fade left when={showRosterDashboard}>
            <div className={`outer-dashboard-roster ${rosterDashboardClass}`}>
                <Fade left cascade when={showRosterDashboard}>
                <div className={`dashboard`}>
                    <button onClick={handleRosterDashboard}>X</button>
                    <h3>Players By Grade</h3>
                    <hr/>
                    <Doughnut data={dataPlayersByGrade} options={options}/>
                    <h3>Players By Position</h3>
                    <hr/>
                    <Doughnut data={dataPositions} options={options}/>
                    <h3>OL Breakdown</h3>
                    <hr/>
                    <Bar data={dataOL} options={options}/>
                    <h3>QB Breakdown</h3>
                    <hr/>
                    <Bar data={dataQB} options={options}/>
                    <h3>RB Breakdown</h3>
                    <hr/>
                    <Bar data={dataRB} options={options}/>
                    <h3>TE Breakdown</h3>
                    <hr/>
                    <Bar data={dataTE} options={options}/>
                    <h3>WR Breakdown</h3>
                    <hr/>
                    <Bar data={dataWR} options={options}/>
                    <h3>DL Breakdown</h3>
                    <hr/>
                    <Bar data={dataDL} options={options}/>
                    <h3>LB Breakdown</h3>
                    <hr/>
                    <Bar data={dataLB} options={options}/>
                    <h3>DB Breakdown</h3>
                    <hr/>
                    <Bar data={dataDB} options={options}/>
                    <h3>LS Breakdown</h3>
                    <hr/>
                    <Bar data={dataLS} options={options}/>
                    <h3>K Breakdown</h3>
                    <hr/>
                    <Bar data={dataK} options={options}/>
                    <h3>P Breakdown</h3>
                    <hr/>
                    <Bar data={dataP} options={options}/>
                </div>
                </Fade>
            </div>
            </Fade>
        </div>
    )
}

export default withContext(UserHome)