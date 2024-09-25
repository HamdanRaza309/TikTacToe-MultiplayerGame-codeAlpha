import React, { useEffect, useState } from 'react';
import './App.css';
import Square from './Square/Square';
import { io } from 'socket.io-client';
export const socket = io('http://localhost:3000', {
  autoConnect: true
});

const renderFrom = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const App = () => {

  const [gameState, setGameState] = useState(renderFrom);
  const [currentPlayer, setCurrentPlayer] = useState('Cross');
  const [finishedState, setFinishedState] = useState(false);
  const [finishedArrayState, setFinishedArrayState] = useState([]);
  const [playOnline, setPlayOnline] = useState(false);

  const checkWinner = () => {
    // Check rows
    for (let row = 0; row < gameState.length; row++) {
      if (
        gameState[row][0] &&
        gameState[row][0] === gameState[row][1] &&
        gameState[row][1] === gameState[row][2]
      ) {
        setFinishedArrayState([row * 3 + 0, row * 3 + 1, row * 3 + 2]);
        return gameState[row][0];
      }
    }

    // Check columns
    for (let col = 0; col < gameState[0].length; col++) {
      if (
        gameState[0][col] &&
        gameState[0][col] === gameState[1][col] &&
        gameState[1][col] === gameState[2][col]
      ) {
        setFinishedArrayState([0 * 3 + col, 1 * 3 + col, 2 * 3 + col])
        return gameState[0][col];
      }
    }

    // Check diagonals
    if (
      gameState[0][0] &&
      gameState[0][0] === gameState[1][1] &&
      gameState[1][1] === gameState[2][2]
    ) {
      return gameState[0][0];
    }

    if (
      gameState[0][2] &&
      gameState[0][2] === gameState[1][1] &&
      gameState[1][1] === gameState[2][0]
    ) {
      return gameState[0][2];
    }

    const isDraw = gameState.flat().every(e => {
      if (e === 'Circle' || e === 'Cross') {
        return true
      }
    })

    if (isDraw) return 'Draw';

    return null;
  };

  useEffect(() => {
    const winner = checkWinner();
    if (winner) {
      setFinishedState(winner);
    }
  }, [gameState]);


  if (!playOnline) {
    return <div className='main-div'>
      <div className='headings'>
        <button className='play-online'>Play Online</button>
        <small className='slogan'>Hamdan - Games</small>
      </div>
    </div>
  }

  return (
    <div className='main-div'>
      <div className="move-detection">
        <div className='left-side'>You</div>
        <div className='right-side'>Opponent</div>
      </div>
      <div>
        <h1 className='game-heading water-bg'>Tic Tac Toe</h1>
        <div className="square-wrapper">
          {gameState.map((arr, rowIndex) =>
            arr.map((e, colIndex) => (
              <Square
                key={rowIndex * 3 + colIndex}
                id={rowIndex * 3 + colIndex}
                setGameState={setGameState}
                currentPlayer={currentPlayer}
                setCurrentPlayer={setCurrentPlayer}
                finishedState={finishedState}
                finishedArrayState={finishedArrayState}
              />
            )
            ))}
        </div>
        {
          finishedState && finishedState !== 'Draw' &&
          (<h1 className='finished-state'>{finishedState} won the Game</h1>)
        }
        {
          finishedState && finishedState === 'Draw' &&
          (<h1 className='finished-state'>It's a {finishedState}</h1>)
        }
      </div>
    </div>
  );
};

export default App;
