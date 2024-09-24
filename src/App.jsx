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
  const [currentPlayer, setCurrentPlayer] = useState('cross');
  const [fineshedState, setFineshedState] = useState(false)



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
                fineshedState={fineshedState}
                setFineshedState={setFineshedState}
              />
            )
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
