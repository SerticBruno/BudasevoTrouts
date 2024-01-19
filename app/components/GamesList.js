"use client";import React, { useContext, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
  Divider,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GamesContext from "../contexts/GamesContext";
import MatchEditForm from "./MatchEditForm";
import PlayersContext from "../contexts/PlayersContext"; // Import PlayersContext

const GamesList = () => {
  const { games, refreshGames } = useContext(GamesContext);
  const { players } = useContext(PlayersContext); // Get players data
  const [openDialog, setOpenDialog] = useState(false);
  const [gameToDelete, setGameToDelete] = useState(null);
  const [editMatch, setEditMatch] = useState(null);

  const handleDeleteClick = (game) => {
    setGameToDelete(game);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    if (gameToDelete) {
      try {
        const response = await fetch(`/api/matches/${gameToDelete._id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Error deleting the game");
        }
        refreshGames();
      } catch (error) {
        console.error("Failed to delete game:", error);
      }
      setOpenDialog(false);
      setGameToDelete(null);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEditClick = (match) => {
    setEditMatch(match);
  };

  const handleCloseEditDialog = () => {
    setEditMatch(null);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Matches
      </Typography>
      {games.map((game, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{game.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {/* Match Details */}
                <Typography variant="subtitle1">Match Details:</Typography>
                <Typography>Name: {game.name}</Typography>
                <Typography>Location: {game.location}</Typography>
                <Typography>Status: {game.status}</Typography>
              </Grid>
              <Grid item xs={6}>
                {/* Team 1 */}
                <Typography variant="subtitle1">Team 1:</Typography>
                <List>
                  {game.team1.map((playerId) => (
                    <ListItem key={playerId}>
                      <ListItemAvatar>
                        <Avatar>
                          {players.find((player) => player._id === playerId)?.name.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={players.find((player) => player._id === playerId)?.name}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={6}>
                {/* Team 2 */}
                <Typography variant="subtitle1">Team 2:</Typography>
                <List>
                  {game.team2.map((playerId) => (
                    <ListItem key={playerId}>
                      <ListItemAvatar>
                        <Avatar>
                          {players.find((player) => player._id === playerId)?.name.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={players.find((player) => player._id === playerId)?.name}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Grid container justifyContent="flex-end">
              <IconButton onClick={() => handleEditClick(game)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteClick(game)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}

      {editMatch && (
        <MatchEditForm
          match={editMatch}
          open={!!editMatch}
          onClose={handleCloseEditDialog}
          onSave={() => refreshGames()}
        />
      )}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this game?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GamesList;
