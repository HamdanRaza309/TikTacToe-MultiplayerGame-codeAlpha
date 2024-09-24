import React, { useState } from 'react';
import './App.css'; // Ensure this points to your CSS file
import Square from './Square/Square';

const renderFrom = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const App = () => {

  const [gameState, setGameState] = useState(renderFrom);

  return (
    <div className='main-div'>
      <div className="move-detection">
        <div className='left-side'>You</div>
        <div className='right-side'>Opponent</div>
      </div>
      <div>
        <h1 className='game-heading water-bg'>Tic Tac Toe</h1>
        <div className="square-wrapper">
          {gameState.map((arr, rowIndex) => (
            <div key={rowIndex}>
              {arr.map(e => (
                <Square key={e} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
