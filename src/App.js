import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import theme from './theme';
import Routes from './routes';
import AppProviders from "./context/appProviders";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppProviders>
        <Router>
          <Routes />
        </Router>
      </AppProviders>
    </ThemeProvider>
  );
}

export default App;
