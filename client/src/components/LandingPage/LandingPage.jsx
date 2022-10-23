import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"
import image from "./landingIcon.png"
import dogSitting from "./dogSitting.png"
import dogStanding from "./dogStanding.png"
 export default function LandingPage() {
    return (
        <div>
            <h1 className="welcome-title">WELCOME TO THE DOG APP!</h1>
            <div className="container">
                <div className="img-container">
                    <img src={dogSitting} className="dogSitting"></img>
                    <img src={dogStanding} className="dogStanding"></img>
                </div>
                <Link to = '/home'>
                    <button class="button-53" role="button">LET'S GO FOR A WALK</button>
                </Link>
            </div>
        </div>
    )
}