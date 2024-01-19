'use client'

import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import Navbar from '../components/Navbar'; // Adjust the import path based on your directory structure
import { Box } from '@mui/material';

const MatchesPage = () => {
  const [matchDetails, setMatchDetails] = useState({
    name: '',
    date: '',
    location: '',
    // Add other fields as necessary
  });

  const handleChange = (e) => {
    setMatchDetails({ ...matchDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit logic here, such as sending data to an API
  };

  return (
    <Box>
      <Navbar />
      <Container maxWidth="sm">
        <Typography variant="h4" style={{ margin: '20px 0' }}>Create a Match</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Match Name"
            name="name"
            value={matchDetails.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {/* Add other TextField components for date, location, etc. */}
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Statistics
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default MatchesPage;
