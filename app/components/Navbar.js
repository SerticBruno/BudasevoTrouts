import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import React from 'react';

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Basketball Community Tournament
        </Typography>
        <Button color="inherit" component={Link} href="/">Home</Button>
        <Button color="inherit" component={Link} href="/statistics">Statistics</Button>
        <Button color="inherit" component={Link} href="/matches">Matches</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;