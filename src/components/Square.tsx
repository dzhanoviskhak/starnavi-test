import React, { useState } from 'react';

type SquareProps = {
  gameStarted: boolean;
  item: string;
  addRow: (sqaure: string) => void;
  removeRow: (square: string) => void;
};

const Square: React.FC<SquareProps> = (props: SquareProps) => {
  const [hoverClass, setHoverClass] = useState('square');

  const changeColor = () => {
    if (props.gameStarted) {
      if (hoverClass === 'square') {
        setHoverClass('square-hover');
        props.addRow(props.item);
      } else {
        setHoverClass('square');
        props.removeRow(props.item);
      }
    }
  };

  return <div className={hoverClass} onMouseEnter={changeColor}></div>;
};

export default Square;
