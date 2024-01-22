'use client'

import React, { useState, useContext, useEffect } from 'react';
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, CircularProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayerEditForm from './PlayerEditForm';
import PlayerDetails from './PlayerDetails';
import PlayersContext from '../contexts/PlayersContext';
import PlayerCreationForm from "../components/PlayerCreationForm";

const PlayersList = () => {
  const { players, fetchPlayers, error } = useContext(PlayersContext);


  const [editPlayer, setEditPlayer] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState(null);

  useEffect(() => {
    // This will trigger a re-render when players data changes
  }, [players]);

  const handleDeleteClick = (player) => {
    setPlayerToDelete(player);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    if (playerToDelete) {
      try {
        const response = await fetch(`/api/players/${playerToDelete._id}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error('Error deleting the player');
        }
        // await fetchPlayers(); // Refresh the players list after deletion
        await refreshPlayers();
      } catch (error) {
        console.error('Failed to delete player:', error);
      }
      setOpenDialog(false);
      setPlayerToDelete(null);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEdit = (player) => {
    setEditPlayer(player);
  };

  const handleCloseEditDialog = () => {
    setEditPlayer(null);
  };

  const handleSavePlayer = async (updatedPlayer) => {
    const { _id, ...updateData } = updatedPlayer;
    try {
      const response = await fetch(`/api/players/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      if (!response.ok) {
        throw new Error('Failed to update player');
      }
      await fetchPlayers(); // Refresh the players list after update
      handleCloseEditDialog();
    } catch (error) {
      console.error('Error updating player:', error);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Players</Typography>
      <PlayerCreationForm></PlayerCreationForm>
      {error && <Typography color="error">{error}</Typography>}
      {players.map((player, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{player.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <PlayerDetails player={player} />
            <IconButton onClick={() => handleEdit(player)}><EditIcon /></IconButton>
            <IconButton onClick={() => handleDeleteClick(player)}><DeleteIcon /></IconButton>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this player?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>

      {editPlayer && <PlayerEditForm player={editPlayer} open={!!editPlayer} onClose={handleCloseEditDialog} onSave={handleSavePlayer} />}
    </Box>
  );
};

export default PlayersList;