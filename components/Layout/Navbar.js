import React from 'react';
import styles from './Navbar.module.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useState } from 'react';
import { Container, createTheme } from '@mui/material';
import Switch from '@mui/material/Switch';

const Navbar = (props) => {
  const [darkMode, setDarkMode] = useState(true);
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const darkModeHandler = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('settings', darkMode);
    props.onAddTheme(theme);
  };

  return (
    <Box>
      <AppBar className={styles.appBar}>
        <Toolbar>
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" component="div">
              <Link href="/">Home</Link>
            </Typography>

            <Typography variant="h6" sx={{ minWidth: 100 }}>
              <Link href="#charts">Charts</Link>
            </Typography>
          </Container>
          <div className={styles.switch}>
            <Typography variant="h6" sx={{ minWidth: 100 }}>
              <Switch
                onClick={darkModeHandler}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
