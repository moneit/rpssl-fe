import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import Header from './Header';
import { useGame } from '../../context/game.context';

const Root = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  '& main': {
    padding: theme.spacing(2),
    paddingTop: '80px',
    minWidth: '100vw',
    display: 'flex',
    flexDirection: 'column',

    '& .MuiContainer-root': {
      flexGrow: 1,
    },

    '& .MuiBox-root': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
      '& button': {
        marginLeft: theme.spacing(2),
      }
    }
  }
}));

const Layout = ({ children }) => {
  const { scoreboard, resetScoreboard } = useGame();
  return (
    <Root sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />
      <main>
        <Box>
          <Typography variant="h6">
            { `${scoreboard.filter((score) => score === 'win').length} win / ` }
            { `${scoreboard.filter((score) => score === 'lose').length} lose / ` }
            { `${scoreboard.filter((score) => score === 'tie').length} tie` }
          </Typography>
          <Button onClick={resetScoreboard}>Reset</Button>
        </Box>
        <Container maxWidth="md">
          { children }
        </Container>
      </main>
    </Root>
  );
};

export default Layout;
