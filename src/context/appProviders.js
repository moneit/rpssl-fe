import React from 'react';

import { GameProvider } from './game.context';

function AppProviders({ children }) {
  return (
    <GameProvider>
      {children}
    </GameProvider>
  );
}

export default AppProviders;
