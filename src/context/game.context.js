import React, { useState } from 'react';

import * as GameService from '../services/game.service';

const GameContext = React.createContext({});

function GameProvider(props) {
  const [choices, setChoices] = useState([]);
  const [botChoice, setBotChoice] = useState();
  const [result, setResult] = useState();
  const [scoreboard, setScoreboard] = useState([]);

  const getChoices = () => {
    return GameService
      .getChoices()
      .then((res) => {
        setChoices(res);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  };

  const getBotChoice = () => {
    return GameService
      .getBotChoice()
      .then((res) => {
        setBotChoice(res);
      })
      .catch((err) => {
        throw err;
      })
  };

  const getResult = (choiceId) => {
    return GameService
      .getResult(choiceId)
      .then((res) => {
        setResult(res.results);

        if (scoreboard.length < 10) {
          setScoreboard([ ...scoreboard, res.result ]);
        } else {
          const [, ...board] = scoreboard;
          setScoreboard([ ...board, res.result ]);
        }
      })
      .catch((err) => {
        throw err;
      })
  };

  const newRound = () => {
    setBotChoice(null);
    setResult(null);
  };

  const resetScoreboard = () => {
    setScoreboard([]);
  };

  return (
    <GameContext.Provider
      value={{
        choices,
        botChoice,
        result,
        scoreboard,
        getChoices,
        getBotChoice,
        getResult,
        newRound,
        resetScoreboard,
      }}
      {...props}
    />
  );
}

function useGame() {
  const context = React.useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

export { GameProvider, useGame };
