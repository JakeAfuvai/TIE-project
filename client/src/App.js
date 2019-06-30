import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Navbar from "./Navbar"
import Home from "./Home"
import Footer from "./Footer"
import Signup from "./Auth/Signup"
import Login from "./Auth/Login"
import UserHome from "./UserHome"
import Roster from "./Roster/Roster"
import Inventory from "./Inventory/Inventory"
import HelmetList from "./Inventory/HelmetList"
import ShoulderpadList from "./Inventory/ShoulderpadList"
import ProtectedRoute from "./Auth/ProtectedRoute"
import "./App.css"

const App = () => {
    return (
        <div className="app-container">
            <Navbar />
            <Switch>
                {/* <Route exact path="/" component={Home}/>
                <ProtectedRoute path="/user_home" component={UserHome}/>
                <ProtectedRoute path="/roster" component={Roster}/>
                <ProtectedRoute path="/inventory" component={Inventory}/>
                <Route exact path="/" render={() => <Redirect to="/user_home" />}/> */}
                <Route exact path="/" component={Home}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/login" component={Login}/>
                <ProtectedRoute path="/user_home" component={UserHome} />
                <ProtectedRoute path="/roster" component={Roster} />
                <ProtectedRoute path="/inventory" component={Inventory} />
                <ProtectedRoute path="/helmet_list" component={HelmetList} />
                <ProtectedRoute path="/shoulderpad_list" component={ShoulderpadList} />
                <Route exact path="/" render={() => <Redirect to="/user_home" />}/>
            </Switch>
            {/* <Home /> */}
            <Footer />
        </div>
    )
}

export default App