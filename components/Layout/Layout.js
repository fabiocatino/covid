import React from 'react';
import Navbar from './Navbar';
import {
  ThemeProvider,
  createTheme,
  Paper,
  Box,
  Container,
} from '@mui/material';
import { useState } from 'react';
import styles from './Layout.module.css';
import StickyFooter from './Footer';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';

export function ScrollTop(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });
  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

const Layout = (props) => {
  const [darkMode, setDarkMode] = useState(
    createTheme({
      palette: {
        mode: 'light',
      },
    })
  );
  const darkModeHandler = (data) => {
    setDarkMode(data);
  };

  return (
    <ThemeProvider theme={darkMode}>
      <Paper className={styles.paper}>
        <Navbar onAddTheme={darkModeHandler} />
        <StickyFooter></StickyFooter>
        <Container sx={{ paddingBottom: 15}}>
          <main>{props.children}</main>
        </Container>

        <ScrollTop {...props}>
          <Fab color="primary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </Paper>
    </ThemeProvider>
  );
};

export default Layout;
