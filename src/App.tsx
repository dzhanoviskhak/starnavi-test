import React from 'react';

import GameComponent from './components/GameComponent';

import './styles/app.scss';

const App: React.FC = () => {
  return (
    <div className='app'>
      <GameComponent />
    </div>
  );
};

export default App;
