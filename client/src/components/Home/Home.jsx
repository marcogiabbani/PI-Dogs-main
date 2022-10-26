import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getDogs, getDogsTemperaments, filterDogsByTemperament, filterByCreated,
     orderByName, orderByWeight, paginaActual } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import PageOrganizer from "../PageOrganizer/PageOrganizer";
import SearchBar from "../SearchBar/SearchBar";
import "./Home.css"

export default function Home (){

    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogBreeds);
    const errorhandler = useSelector((state) => state.errorhandler);
    const allTemperaments = useSelector((state) => state.dogTemperaments);
    const pagina = useSelector((state) => state.currentPage);
    const [order, setOrder] = useState('')
    const [currentPage, setCurrentPage] = useState(pagina);
    const [dogsPerPage, setDogsPerPage] = useState(8);
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFistDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFistDog, indexOfLastDog);


    const pageOrganizer = (pageNumber) => {
        setCurrentPage(pageNumber)
        dispatch(paginaActual(pageNumber))
        
    }


    useEffect(() => {
        if (!allDogs.length){
            setCurrentPage(1)
            dispatch(getDogs());
            dispatch(getDogsTemperaments());}


    }, [dispatch])


    const handleClick = (event=>{
        event.preventDefault();
        dispatch(getDogs());
        setCurrentPage(1)
        dispatch(paginaActual(1))
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
        setCurrentPage(1)
        dispatch(paginaActual(1))
    })


    const handleCreatedFilter = (event=>{
        dispatch(filterByCreated(event.target.value))
        setCurrentPage(1)
        dispatch(paginaActual(1))
        
    })


    return ( 
        <div>
            {errorhandler ? <h1>{errorhandler}</h1> : null}
            <nav className="navbar">
                <ul className="navbar-nav">

                    <li className="nav-item">
                        <div className="nav-link" onClick={event => {handleClick(event)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/>
                            </svg>
                            <span className="link-text">Reload dogs</span>
                        </div>
                    </li>

                    <li className="nav-item">
                        <div className="nav-link">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
                            </svg>
                            <span className="link-text">Home</span>
                        </div>
                    </li>

                    <li className="nav-item">
                        <div className="nav-link">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path d="M183.6 42.4C177.5 35.8 169 32 160 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L128 146.3V448c0 17.7 14.3 32 32 32s32-14.3 32-32V146.3l32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 320c0 17.7 14.3 32 32 32h50.7l-73.4 73.4c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H429.3l73.4-73.4c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8H352c-17.7 0-32 14.3-32 32zM416 32c-12.1 0-23.2 6.8-28.6 17.7l-64 128-16 32c-7.9 15.8-1.5 35 14.3 42.9s35 1.5 42.9-14.3l7.2-14.3h88.4l7.2 14.3c7.9 15.8 27.1 22.2 42.9 14.3s22.2-27.1 14.3-42.9l-16-32-64-128C439.2 38.8 428.1 32 416 32zM395.8 176L416 135.6 436.2 176H395.8z"/>
                            </svg>
                            <option value="asc" className="link-text" onClick={event => handleAlphaSort(event)}>Ascendant</option>
                        </div>
                    </li>

                    <li className="nav-item">
                        <div className="nav-link">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path d="M183.6 469.6C177.5 476.2 169 480 160 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L128 365.7V64c0-17.7 14.3-32 32-32s32 14.3 32 32V365.7l32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 320c0-17.7 14.3-32 32-32H480c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9L429.3 416H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H352c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9L402.7 352H352c-17.7 0-32-14.3-32-32zM416 32c12.1 0 23.2 6.8 28.6 17.7l64 128 16 32c7.9 15.8 1.5 35-14.3 42.9s-35 1.5-42.9-14.3L460.2 224H371.8l-7.2 14.3c-7.9 15.8-27.1 22.2-42.9 14.3s-22.2-27.1-14.3-42.9l16-32 64-128C392.8 38.8 403.9 32 416 32zM395.8 176h40.4L416 135.6 395.8 176z"/>
                            </svg>
                            <option value="desc" className="link-text" onClick={event => handleAlphaSort(event)}> Descendant</option>
                        </div>
                    </li>

                    <li className="nav-item">
                        <div className="nav-link">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path d="M117.9 62.4c-16.8-5.6-25.8-23.7-20.2-40.5s23.7-25.8 40.5-20.2l113 37.7C265 15.8 290.7 0 320 0c44.2 0 80 35.8 80 80c0 3-.2 5.9-.5 8.8l122.6 40.9c16.8 5.6 25.8 23.7 20.2 40.5s-23.7 25.8-40.5 20.2L366.4 145.2c-4.5 3.2-9.3 5.9-14.4 8.2V480c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32s14.3-32 32-32H288V153.3c-21-9.2-37.2-27-44.2-49l-125.9-42zm396.3 211c-.4-.8-1.3-1.3-2.2-1.3s-1.7 .5-2.2 1.3L435.1 416H588.9L514.2 273.3zM512 224c18.8 0 36 10.4 44.7 27l77.8 148.5c3.1 5.8 6.1 14 5.5 23.8c-.7 12.1-4.8 35.2-24.8 55.1C594.9 498.6 562.2 512 512 512s-82.9-13.4-103.2-33.5c-20-20-24.2-43-24.8-55.1c-.6-9.8 2.5-18 5.5-23.8L467.3 251c8.7-16.6 25.9-27 44.7-27zM128 144c-.9 0-1.7 .5-2.2 1.3L51.1 288H204.9L130.2 145.3c-.4-.8-1.3-1.3-2.2-1.3zm44.7-21l77.8 148.5c3.1 5.8 6.1 14 5.5 23.8c-.7 12.1-4.8 35.2-24.8 55.1C210.9 370.6 178.2 384 128 384s-82.9-13.4-103.2-33.5c-20-20-24.2-43-24.8-55.1c-.6-9.8 2.5-18 5.5-23.8L83.3 123C92 106.4 109.2 96 128 96s36 10.4 44.7 27z"/>
                            </svg>
                            <option value="asc" className="link-text" onClick={event => handleWeightSort(event)}>Weigth Ascendant</option>
                        </div>
                    </li>

                    <li className="nav-item">
                        <div className="nav-link">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path d="M522.1 62.4c16.8-5.6 25.8-23.7 20.2-40.5S518.6-3.9 501.9 1.6l-113 37.7C375 15.8 349.3 0 320 0c-44.2 0-80 35.8-80 80c0 3 .2 5.9 .5 8.8L117.9 129.6c-16.8 5.6-25.8 23.7-20.2 40.5s23.7 25.8 40.5 20.2l135.5-45.2c4.5 3.2 9.3 5.9 14.4 8.2V480c0 17.7 14.3 32 32 32H512c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V153.3c21-9.2 37.2-27 44.2-49l125.9-42zm-396.3 211c.4-.8 1.3-1.3 2.2-1.3s1.7 .5 2.2 1.3L204.9 416H51.1l74.7-142.7zM128 224c-18.8 0-36 10.4-44.7 27L5.5 399.5c-3.1 5.8-6.1 14-5.5 23.8c.7 12.1 4.8 35.2 24.8 55.1C45.1 498.6 77.8 512 128 512s82.9-13.4 103.2-33.5c20-20 24.2-43 24.8-55.1c.6-9.8-2.5-18-5.5-23.8L172.7 251c-8.7-16.6-25.9-27-44.7-27zm384-80c.9 0 1.7 .5 2.2 1.3L588.9 288H435.1l74.7-142.7c.4-.8 1.3-1.3 2.2-1.3zm-44.7-21L389.5 271.5c-3.1 5.8-6.1 14-5.5 23.8c.7 12.1 4.8 35.2 24.8 55.1C429.1 370.6 461.8 384 512 384s82.9-13.4 103.2-33.5c20-20 24.2-43 24.8-55.1c.6-9.8-2.5-18-5.5-23.8L556.7 123C548 106.4 530.8 96 512 96s-36 10.4-44.7 27z"/>
                            </svg>
                            <option value="desc" className="link-text" onClick={event => handleWeightSort(event)}>Weigth Descendant</option>
                        </div>
                    </li>

                    <li className="nav-item">
                        <div className="nav-link">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path d="M309.6 158.5L332.7 19.8C334.6 8.4 344.5 0 356.1 0c7.5 0 14.5 3.5 19 9.5L392 32h52.1c12.7 0 24.9 5.1 33.9 14.1L496 64h56c13.3 0 24 10.7 24 24v24c0 44.2-35.8 80-80 80H464 448 426.7l-5.1 30.5-112-64zM416 256.1L416 480c0 17.7-14.3 32-32 32H352c-17.7 0-32-14.3-32-32V364.8c-24 12.3-51.2 19.2-80 19.2s-56-6.9-80-19.2V480c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V249.8c-28.8-10.9-51.4-35.3-59.2-66.5L1 167.8c-4.3-17.1 6.1-34.5 23.3-38.8s34.5 6.1 38.8 23.3l3.9 15.5C70.5 182 83.3 192 98 192h30 16H303.8L416 256.1zM464 80c0-8.8-7.2-16-16-16s-16 7.2-16 16s7.2 16 16 16s16-7.2 16-16z"/>
                        </svg>
                        <option value="All" className="link-text" onClick={event => handleCreatedFilter(event)}>All breeds</option>
                        </div>
                    </li>

                    <li className="nav-item">
                        <div className="nav-link">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path d="M175 389.4c-9.8 16-15 34.3-15 53.1c-10 3.5-20.8 5.5-32 5.5c-53 0-96-43-96-96V64C14.3 64 0 49.7 0 32S14.3 0 32 0H96h64 64c17.7 0 32 14.3 32 32s-14.3 32-32 32V309.9l-49 79.6zM96 64v96h64V64H96zM352 0H480h32c17.7 0 32 14.3 32 32s-14.3 32-32 32V214.9L629.7 406.2c6.7 10.9 10.3 23.5 10.3 36.4c0 38.3-31.1 69.4-69.4 69.4H261.4c-38.3 0-69.4-31.1-69.4-69.4c0-12.8 3.6-25.4 10.3-36.4L320 214.9V64c-17.7 0-32-14.3-32-32s14.3-32 32-32h32zm32 64V224c0 5.9-1.6 11.7-4.7 16.8L330.5 320h171l-48.8-79.2c-3.1-5-4.7-10.8-4.7-16.8V64H384z"/>
                            </svg>
                            <option value="created" className="link-text" onClick={event => handleCreatedFilter(event)}>Created breeds</option>
                        </div>
                    </li>

                    <li className="nav-item">
                        <div className="nav-link">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0S448 35.8 448 80zM393.2 214.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432V346.1z"/>
                            </svg>
                            <option value="Api" className="link-text" onClick={event => handleCreatedFilter(event)}>Api breeds</option>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link to='/createBreed' className="nav-link">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                                <span className="link-text">Add breed</span>
                        </Link>
                    </li>

                </ul>
            </nav>

            <div className="homeBody">
                <SearchBar/>
                <div className="container">
                <select className="select-button" onChange={event => handleTemperamentFilter(event)}> 
                    <option value="All">
                        Look for all temperaments or just for...
                    </option>
                    {allTemperaments && allTemperaments.map(temperament => {
                        return (
                            <option value={temperament.name} key={temperament.id}>
                                {temperament.name}
                            </option>
                        )
                    })
                }
                </select>
                </div>
                <div className="card-list"> {
                    currentDogs && currentDogs.map(doge => {
                        return (
                            <div key={doge.id} className="card">
                                <Link to={`/dogs/${doge.id}`}>
                                    <Card 
                                        name={doge.name}
                                        temperament={doge.temperament}
                                        weight={doge.weight.metric}
                                        image={doge.image}
                                        key={doge.id}
                                    />
                                </Link>
                            </div>
                        )
                    })
                }
                </div>
                <div className="page-list">
                    <PageOrganizer
                        dogsPerPage={dogsPerPage}
                        allDogs={allDogs.length}
                        pageOrganizer={pageOrganizer}
                    />
                </div>
            </div>
        </div>
    )
}