import React, { Component } from 'react';
import { withContext } from "../AppContext"
import "./Signup.css"

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            errorMessage: ""
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    clearInputs = () => {
        this.setState({
            username: "",
            password: "",
            errorMessage: ""
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signup(this.state)
            .then(() => this.props.history.push("/user_home"))
            .catch(err => {
                this.setState({errorMessage: err.response.data.message})
            })
            this.clearInputs()
    }

    render() {
        return (
            <div className="form-wrapper">
                <form onSubmit={this.handleSubmit}>
                    <h3>Sign Up</h3>
                    <input
                        onChange={this.handleChange}
                        value={this.state.username}
                        name="username"
                        type="text"
                        placeholder="Username"
                    />
                    <input
                        onChange={this.handleChange}
                        value={this.state.password}
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                    {this.state.username !== "" && this.state.password !== "" ?
                        <button type="submit">Create Account</button>
                        :           
                        <p>Enter Username and Password to Signup</p>
                    }
                    {
                        this.state.errorMessage &&
                        <p style={{background: "#faafaa", color: "#FFF", fontSize: "0.75em", padding: "1pt 5pt", borderRadius: "2pt"}}>{this.state.errorMessage}</p>
                    }
                </form>
            </div>
        )
    }
}

export default withContext(Signup);