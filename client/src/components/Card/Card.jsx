import React from "react";
import "./Card.css"


 export default function Card ({name, image, temperament, weight}){
    return (
        <article >
            <div className="card-header">

                <h3>{name}</h3>
                <h5>{temperament}</h5>
                <h5>{weight}</h5>
                <img src={image} alt='dogePhoto' width='200px' height='250px'></img>
            </div>
        </article>
    )
 }