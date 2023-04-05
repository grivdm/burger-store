import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Header from './Header';
import Footer from './Footer';


const theme = createTheme();

interface LayoutProps {
    children: React.ReactNode;
  }

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const isLoggedIn = false;
    const handleLogout = () => {};
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Container maxWidth="xl">
        <main>{children}</main>
      </Container>
      <Footer/>
    </ThemeProvider>
  );
};

export default Layout;