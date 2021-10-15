import React, { useEffect, useState } from 'react';

import Square from './Square';

type FetchedData = {
  [key: string]: { field: number };
};

const GameComponent: React.FC = () => {
  const [squares, setSquares] = useState<string[]>([]);
  const [rows, setRows] = useState<string[]>([]);
  const [data, setData] = useState<FetchedData>({});
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState('');
  const [tableWidth, setTableWidth] = useState('210px');
  const BASE_URL = 'http://demo1030918.mockable.io/';

  const fetchData = async (setState: any) => {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    setState(data);
  };

  useEffect(() => {
    fetchData(setData);
  }, []);

  const drawSquares = (field: number) => {
    const array = [];
    for (let i = 1; i <= field; i++) {
      for (let k = 1; k <= field; k++) {
        array.push(`row ${i} col ${k}`);
      }
    }
    setSquares(array);
  };

  const startGame = () => {
    if (gameMode !== '' && data) {
      setGameStarted(true);
      switch (gameMode) {
        case 'easy':
          drawSquares(data?.easyMode?.field);
          setTableWidth('210px');
          break;
        case 'normal':
          drawSquares(data?.normalMode?.field);
          setTableWidth('420px');
          break;
        case 'hard':
          drawSquares(data?.hardMode?.field);
          setTableWidth('630px');
          break;
      }
    } else {
      alert('Please pick game mode');
    }
  };

  const stopGame = () => {
    setGameStarted(false);
    clearGame();
  };

  const clearGame = () => {
    setRows([]);
    setSquares([]);
  };

  const addRowToMap = (square: string) => {
    const array = [...rows, square];
    setRows(array);
  };

  const removeRowFromMap = (square: string) => {
    const array = rows.filter((row) => row !== square);
    setRows(array);
  };

  return (
    <div className='wrapper'>
      <div className='left'>
        <select
          onChange={(e) => setGameMode(e.target.value)}
          disabled={gameStarted}
          defaultValue='pick'
        >
          <option value='pick' hidden>
            Pick mode
          </option>
          <option value='easy'>Easy</option>
          <option value='normal'>Normal</option>
          <option value='hard'>Hard</option>
        </select>
        {gameStarted ? (
          <button
            type='button'
            className='left__button'
            style={{ backgroundColor: '#f04b4b' }}
            onClick={stopGame}
          >
            Stop
          </button>
        ) : (
          <button type='button' className='left__button' onClick={startGame}>
            Start
          </button>
        )}
        <div className='table' style={{ width: tableWidth }}>
          {squares.map((item) => {
            return (
              <Square
                gameStarted={gameStarted}
                item={item}
                key={item}
                addRow={addRowToMap}
                removeRow={removeRowFromMap}
              />
            );
          })}
        </div>
      </div>
      <div className='right'>
        <h3 className='right__title'>Hover squares</h3>
        {rows.map((row) => {
          return (
            <span className='right__row' key={row}>
              {row}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default GameComponent;
