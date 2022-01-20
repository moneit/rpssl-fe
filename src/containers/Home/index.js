import React, { useEffect, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import PersonIcon from '@mui/icons-material/Person';

import { useGame } from '../../context/game.context';
import Modal from '../../components/Modals';

const PREFIX = 'exchange';
const classes = {
  root: `${PREFIX}-root`,
  choices: `${PREFIX}-choices`,
  choice: `${PREFIX}-choice`,
  board: `${PREFIX}-board`,
};

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },

  [`& .${classes.choices}`]: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },

  [`& .${classes.board}`]: {
    width: '100%',
    height: '300px',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    '& [role="separator"]': {
      margin: theme.spacing(0, 2),
    },

    '& .MuiGrid-item': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',

      '& svg': {
        fontSize: 40,
      }
    },

    [`& .${classes.choice}`]: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',

      '& .MuiTypography-h6': {
        textTransform: 'capitalize',
      },

      '& img': {
        width: '100%',
        height: 'auto',
      }
    },
  }
}));

const resultMessages = [
  { result: 'win', message: "You won!" },
  { result: 'lose', message: "You lost!" },
  { result: 'tie', message: "Tied!" },
];

const Home = () => {
  const {
    result,
    choices,
    round,
    botChoice,
    getChoices,
    getBotChoice,
    getResult,
    newRound,
  } = useGame();
  const [selectedChoiceId, setSelectedChoiceId] = useState();
  const [openResultModal, setOpenResultModal] = useState(false);
  const [roundFinished, setRoundFinished] = useState(false);

  useEffect(() => {
    getChoices();
  }, []);

  useEffect(() => {
    setSelectedChoiceId(null);
  }, [round]);

  const selectedChoice = useMemo(() => (
    choices.find((choice) => choice.id === selectedChoiceId) || null
  ), [selectedChoiceId, choices]);

  const handleClick = (choiceId) => {
    if (!roundFinished) {
      setSelectedChoiceId(choiceId);
    }
  };

  const handlePlay = () => {
    if (selectedChoiceId) {
      getBotChoice().then(() => {
        getResult(selectedChoiceId).then(() => {
          setOpenResultModal(true);
        });
      });
    }
  };

  const handleCloseResultModal = () => {
    setOpenResultModal(false);
    setRoundFinished(true);
  };

  const handleNewRound = () => {
    setSelectedChoiceId(null);
    newRound();
    setRoundFinished(false);
  };

  return (
    <Root className={classes.root}>
      <Button variant="contained" onClick={handlePlay} disabled={roundFinished || !selectedChoiceId}>Play</Button>

      <Grid container className={classes.board}>
        <Grid item xs>
          <PersonIcon />
          <Box className={classes.choice}>
            {
              selectedChoice && (
                <>
                  <img className="" src={`http://localhost:8080/${selectedChoice?.name}.png`} alt={selectedChoice?.name} />
                  <Typography variant="h6">{selectedChoice?.name}</Typography>
                </>
              )
            }
          </Box>
        </Grid>
        <Divider orientation="vertical" flexItem>
          V.S
        </Divider>
        <Grid item xs>
          <DesktopMacIcon />
          <Box className={classes.choice}>
            {
              botChoice && (
                <>
                  <img src={`http://localhost:8080/${botChoice?.name}.png`} alt={botChoice?.name} />
                  <Typography variant="h6">{botChoice && botChoice.name}</Typography>
                </>
              )
            }
          </Box>
        </Grid>
      </Grid>

      <Box className={classes.choices}>
        {
          choices.map((choice, index) => (
            <Box key={index}>
              <Button onClick={() => handleClick(choice.id)} size="small">
                {choice.name}
              </Button>
            </Box>
          ))
        }
      </Box>

      {
        roundFinished && (
          <Button variant="contained" onClick={handleNewRound}>
            New Game
          </Button>
        )
      }
      {
        openResultModal && (
          <Modal open title="Game Result" handelCloseModal={handleCloseResultModal}>
            <Typography variant="h3">
              {
                resultMessages.find((message) => result === message.result)?.message
              }
            </Typography>
          </Modal>
        )
      }
    </Root>
  )
};

export default Home;
