'use client'

import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import Navbar from '../components/Navbar'; // Adjust the import path as necessary

const MatchesPage = () => {
  const [matchDetails, setMatchDetails] = useState({
    name: '',
    date: '', // Assuming this is a string for simplicity, e.g., '2021-12-31'
    location: '',
    // Additional fields as necessary
  });
  const [bgColor, setBgColor] = useState('#828282'); // Initial background color

  const handleChange = (event) => {
    setMatchDetails({ ...matchDetails, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/matches/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(matchDetails),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Match created:', data);
      // Handle success (e.g., reset form, display success message)
    } catch (error) {
      console.error('Failed to create match:', error);
      // Handle errors (e.g., display error message)
    }
  };

  return (
    <Box>
      <Navbar />
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>Create a Match</Typography>
        <form onSubmit={handleSubmit}>
          
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            sx={{ mt: 2 }}>
            Create Match
          </Button>
        </form>

      </Container>
    </Box>
  );
};

export default MatchesPage;
