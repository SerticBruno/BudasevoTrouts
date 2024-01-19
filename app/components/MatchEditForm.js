'use client'

import React, { useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import GamesContext from '../contexts/GamesContext'; // Adjust the import path as necessary

const MatchEditForm = ({ match, open, onClose, onSave }) => {
  const [matchDetails, setMatchDetails] = useState({ ...match });
  const { refreshGames } = useContext(GamesContext);

  const handleChange = (event) => {
    setMatchDetails({ ...matchDetails, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/matches/${match._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(matchDetails),
      });
      if (!response.ok) {
        throw new Error('Failed to update match');
      }
      onClose(); // Close the form dialog
      onSave(); // Optional callback
      refreshGames(); // Refresh the games list
    } catch (error) {
      console.error('Error updating match:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Match</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Match Name"
            name="name"
            value={matchDetails.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date"
            name="date"
            type="date"
            value={matchDetails.date}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Location"
            name="location"
            value={matchDetails.location}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" color="primary">Save</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MatchEditForm;
