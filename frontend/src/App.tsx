import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider, createTheme  } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Global, css } from '@emotion/react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';


const globalStyles = css`
  body {
    font-family: 'Roboto', sans-serif;
  }
`;

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff5722',
    },
    secondary: {
      main: '#03a9f4',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Global styles={globalStyles} />
      <Router>
        <Layout>
            {/* <Route > */}
              <HomePage />
            {/* </Route> */}
            
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;