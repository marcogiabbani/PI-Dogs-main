import React from "react";
import { useState } from "react";
import {useDispatch} from 'react-redux';
import {getBreedName} from '../../actions';
import "./SearchBar.css"

export default function SearchBar (){
    
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const handleInputChange = (event) => {
        event.preventDefault();
        setName(event.target.value)
        dispatch(getBreedName(name))
        console.log(name)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(getBreedName(name))
    }

    return (
        <div className="search-container">
            <input type='text' placeholder="Type the breed you are looking for..." className="search-input"
            onChange={(event) => handleInputChange(event)}
            
            />
            <button className="search-button" type="submit" onClick={(event) => handleSubmit(event)}>Search</button>
        </div>
    )

}