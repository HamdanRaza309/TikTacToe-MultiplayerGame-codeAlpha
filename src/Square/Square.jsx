import React, { useState } from 'react'
import './Square.css'

const circleSvg = (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
            {" "}
            <path
                d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>{" "}
        </g>
    </svg>
);

const crossSvg = (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
            {" "}
            <path
                d="M19 5L5 19M5.00001 5L19 19"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>{" "}
        </g>
    </svg>
);

function Square({
    id,
    setGameState,
    currentPlayer,
    setCurrentPlayer,
    finishedState,
}) {

    const [icon, setIcon] = useState(null);

    const clickOnSquare = () => {
        if (finishedState) {
            return;
        }
        if (!icon) {
            if (currentPlayer === 'Circle') {
                setIcon(circleSvg)
            } else {
                setIcon(crossSvg)
            }

            setGameState(prevState => {
                let newState = [...prevState];
                const rowIndex = Math.floor(id / 3);
                const colIndex = id % 3;
                const myCurrentPlayer = currentPlayer;
                newState[rowIndex][colIndex] = myCurrentPlayer;

                return prevState
            })
            setCurrentPlayer(currentPlayer === 'Circle' ? 'Cross' : 'Circle');
        }
    }

    return (
        <div onClick={clickOnSquare} className={`square ${finishedState ? 'not-allowed' : ''}`}>
            {icon}
        </div>
    )
}

export default Square