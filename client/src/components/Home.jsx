import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getDogs } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import PageOrganizer from "./PageOrganizer";

export default function Home (){
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogBreeds);

    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8);
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFistDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFistDog, indexOfLastDog);

    const pageOrganizer = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


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
            <button onClick={event => {handleClick(event)}}>Reload Dogs </button>
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
            <PageOrganizer dogsPerPage={dogsPerPage} allDogs={allDogs.length}
                           pageOrganizer={pageOrganizer}/>
        </div>
        <div> {
            currentDogs && currentDogs.map(doge => {
                return (
                    <div key={doge.id}>
                        <Card name={doge.name} temperament={doge.temperament}
                              weight={doge.weight.metric} image={doge.image} />
                    </div>
                )
            })
        }
        </div>

        </div>
    )

}