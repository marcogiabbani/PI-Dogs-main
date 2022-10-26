import React from "react";
import "./PageOrganizer.css"
import {useSelector} from "react-redux";

export default function PageOrganizer ({dogsPerPage, allDogs, pageOrganizer}) {
    const pageNumbers = [];
    let totalPages = Math.ceil(allDogs/dogsPerPage)

    for (let i = 1 ; i <= totalPages; i++) pageNumbers.push(i);
    const currentNumber = useSelector((state) => state.currentPage)
    return (
        <nav className="numbers">
            <ul> {
                pageNumbers && pageNumbers.map(number => (
                    <a className={currentNumber === number ? "number activePage" : 'number'}onClick={() => pageOrganizer(number)}>
                    <li  key={number}>
                        {number}
                    </li>
                    </a>
                ))
            }
            </ul>
        </nav>
    )
}