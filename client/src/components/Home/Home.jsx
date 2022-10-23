import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getDogs, getDogsTemperaments, filterDogsByTemperament, filterByCreated,
     orderByName, orderByWeight } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card";
import PageOrganizer from "../PageOrganizer";
import SearchBar from "../SearchBar";
import "./Home.css"

export default function Home (){
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogBreeds);
    const allTemperaments = useSelector((state) => state.dogTemperaments)

    const [order, setOrder] = useState('')

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
        dispatch(getDogsTemperaments());
    }, [dispatch])

    const handleClick = (event=>{
        event.preventDefault();
        dispatch(getDogs());
    })

    function handleAlphaSort (event) {
        event.preventDefault();
        dispatch(orderByName(event.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${event.target.value}`);
    }

    function handleWeightSort (event) {
        event.preventDefault();
        dispatch(orderByWeight(event.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${event.target.value}`);
    }


    const handleTemperamentFilter = (event=>{
        dispatch(filterDogsByTemperament(event.target.value))
    })

    const handleCreatedFilter = (event=>{
        dispatch(filterByCreated(event.target.value))
    })

    return ( <div className="homeBackground">
        <div>
            <Link to='/createBreed'>Add new breed</Link>
            <h1>Dogs</h1>
            <button onClick={event => {handleClick(event)}}>Reload Dogs </button>
        <div>
            <select onChange={event => handleAlphaSort(event)}>
                <option value="alpha">Alphabetical order</option>
                <option value="asc">Ascendant</option>
                <option value="desc">Descendant</option>
            </select>

            <select onChange={event => handleWeightSort(event)}>
                <option value="weigth">Weigth</option>
                <option value="asc">Ascendant</option>
                <option value="desc">Descendant</option>
            </select>

            <select onChange={event => handleCreatedFilter(event)}>
                <option value="All">All</option>
                <option value="created">Created</option>
                <option value="Api">Api imported</option>
            </select>

            <select onChange={event => handleTemperamentFilter(event)}> 
                <option value="All">All</option>
                {allTemperaments && allTemperaments.map(temperament => {
                    return (
                        <option value={temperament.name} key={temperament.id}>
                            {temperament.name}
                        </option>
                    )
                })
            }
            </select>
        
            <PageOrganizer dogsPerPage={dogsPerPage} allDogs={allDogs.length}
                           pageOrganizer={pageOrganizer}/>
            <SearchBar/>
        </div>
        <div> {
            currentDogs && currentDogs.map(doge => {
                return (
                   
                    <div>
                         <Link to={`/dogs${doge.id}`}>
                        <Card name={doge.name} temperament={doge.temperament}
                              weight={doge.weight.metric} image={doge.image} key={doge.id}/>
                        </Link>
                    </div>

                )
            })
        }
        </div>

        </div>
        </div>
    )

}