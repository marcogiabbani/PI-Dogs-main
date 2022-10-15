import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getDogs } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";

export default function Home (){
    const dispatch = useDispatch();
     const allDogs = useSelector((state) => state.dogBreeds);

    useEffect(() => {
        dispatch(getDogs());
    }, [dispatch])

    const handleClick = (event=>{
        event.preventDefault();
        dispatch(getDogs());
    })

    return (
        <div>
        <Link to='/newBreed'>Add new breed</Link>
        {/* ver que link va bien */}
        <h1>Dogs</h1>
        <button onClick={event => {handleClick(event)}}>
            Reload Dogs
        </button>
        <div>
            <select>
                <option value="asc">Ascendant</option>
                <option value="desc">Descendant</option>

            </select>
            <select>
                <option value="alpha">Alphabetical order</option>
                <option value="weigth">Weigth</option>
                <option value="temp">Temperament</option>
                <option value="crtdBreed">Created breed</option>
                {/* ella le pasa los mismos values que lo que tiene en la api */}
            </select>
        </div>
<div>        {allDogs && allDogs.map(doge => {
            return (
            <Card name={doge.name} temperament={doge.temperament} weight={doge.weight.metric}
                image={doge.image}/>
        )})}</div>

        </div>
    )

}