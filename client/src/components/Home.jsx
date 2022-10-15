import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getDogs } from "../actions";
import { Link } from "react-router-dom";

export default function Home (){
    const dispatch = useDispatch();
     const allDogs = useSelector((state) => state.dogBreeds);

    useEffect(() => {
        dispatch(getDogs());
    }, [dispatch])

    return (
        <div>
        <h1>Home</h1>
        </div>
    )

}