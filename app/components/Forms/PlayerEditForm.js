'use client'

import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const PlayerEditForm = ({ player, open, onClose, onSave }) => {
  const [playerDetails, setPlayerDetails] = useState({
    name: '',
    position: '',
    score: 0,
  });

  useEffect(() => {
    // When the player prop changes, update the form fields
    if (player) {
      setPlayerDetails({ ...player });
    }
  }, [player]);

  const handleChange = (event) => {
    setPlayerDetails({ ...playerDetails, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(playerDetails);
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Player</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Player Name"
          type="text"
          fullWidth
          value={playerDetails.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="position"
          label="Position"
          type="text"
          fullWidth
          value={playerDetails.position}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="score"
          label="Score"
          type="number"
          fullWidth
          value={playerDetails.score}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlayerEditForm;
