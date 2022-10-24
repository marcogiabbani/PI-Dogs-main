import React from "react";
import "./Card.css"


 export default function Card ({name, image, temperament, weight}){
    return (
        <article >
            <div className="card-sections">
                <div className="card-info">
                <h3>{name}</h3>
                <h5> Temperaments: {temperament}</h5>
                <h5>Weight range: {weight}</h5>
                </div>
                <img src={image} alt='dogePhoto'></img>
            </div>
            

        </article>
    )
 }