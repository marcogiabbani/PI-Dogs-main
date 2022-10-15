import React from "react";
import { Link } from "react-router-dom";
 export default function LandingPage() {
    return (
        <div>
            <h1>Bienvenidos a la Dog App!</h1>
            <Link to = '/home'>
                <button>vamos a pasear</button>
            </Link>
        </div>
    )
 }