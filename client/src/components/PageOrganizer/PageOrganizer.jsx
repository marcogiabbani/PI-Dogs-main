import React from "react";
import "./PageOrganizer.css"

export default function PageOrganizer ({dogsPerPage, allDogs, pageOrganizer}) {
    const pageNumbers = [];
    let totalPages = Math.ceil(allDogs/dogsPerPage)

    for (let i = 1 ; i <= totalPages; i++) pageNumbers.push(i);

    return (
        <nav className="numbers">
            <ul className="pageOrganizer"> {
                pageNumbers && pageNumbers.map(number => (
                    <li className="number" key={number}>
                        <a onClick={() => pageOrganizer(number)}>{number}</a>
                    </li>
                ))
            }
            </ul>
        </nav>
    )
}