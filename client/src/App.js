import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Navbar from "./Navbar"
import Home from "./Home"
import Footer from "./Footer"
import Signup from "./Auth/Signup"
import Login from "./Auth/Login"

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
                {/* <Route exact path="/" render={() => <Redirect to="/user_home" />}/> */}
            </Switch>
            <Home />
            <Footer />
        </div>
    )
}

export default App