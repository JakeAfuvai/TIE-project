import React, { useState } from 'react';
import { withContext } from "../AppContext"

const LoginForm = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const clearInputs = () => {
        setUsername("")
        setPassword("")
        setErrorMessage("")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.login({username, password, errorMessage})
            .then(() => props.history.push("/user_home"))
            .catch(err => {
                setErrorMessage(err.response.data.message)
            })
            clearInputs()
            // call clearInputs?
    }

    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
                <h3>Log In</h3>
                <input
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                    name="username"
                    type="text"
                    placeholder="username"
                />
                <input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name="password"
                    type="password"
                    placeholder="password"/>
                <button type="submit">Submit</button>
            {
                errorMessage &&
                <p style={{background: "#faafaa", color: "#FFF", fontSize: "0.75em", padding: "1pt 5pt", borderRadius: "2pt"}}>{errorMessage}</p>
            }
            </form>
        </div>
    )
}

export default withContext(LoginForm);