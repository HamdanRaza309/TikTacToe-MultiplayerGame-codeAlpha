import React, { useEffect, useState } from 'react';
import './App.css';
import Square from './Square/Square';

const renderFrom = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const App = () => {

  const [gameState, setGameState] = useState(renderFrom);
  const [currentPlayer, setCurrentPlayer] = useState('Cross');
  const [finishedState, setFinishedState] = useState(false)

  const checkWinner = () => {
    // Check rows
    for (let row = 0; row < gameState.length; row++) {
      if (
        gameState[row][0] &&
        gameState[row][0] === gameState[row][1] &&
        gameState[row][1] === gameState[row][2]
      ) {
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
