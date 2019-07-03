import React from "react"
import "./Footer.css"

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="contact-container">
                <h2>Contact</h2>
                <p>4785 South 50 East</p>
                <p>Ogden, UT</p>
                <p>84403</p>
                <p>801 317 3173</p>
            </div>
            <div className="about-container">
                <h2>About</h2>
                <p>History</p>
                <p>Inspiration</p>
                <p>By Coaches For Coaches</p>
            </div>
            <div className="share-container">
                <h2>Share</h2>
            </div>
        </div>
    )
}

export default Footer