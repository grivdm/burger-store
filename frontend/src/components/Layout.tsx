import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Header from './Header';
import Footer from './Footer';
import CartPopup from './Cart/CartPopup';


const theme = createTheme();

interface LayoutProps {
    children: React.ReactNode;
  }

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="xl"
      sx={{ 
        py: 2,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
      >
        <CartPopup />
        <main>{children}</main>
      </Container>
      <Footer/>
    </ThemeProvider>
  );
};

export default Layout;