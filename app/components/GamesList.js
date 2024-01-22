"use client";
import React, { useContext, useState, useEffect } from "react";
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
  CircularProgress,
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
import Skeleton from "@mui/material/Skeleton"; // Importing Skeleton component

import PlayersContext from "../contexts/PlayersContext"; // Import PlayersContext
import MatchCreationForm from "../components/MatchCreationForm";
import GameAccordion from "./GameAccordion";

const GamesList = () => {
  const { games, refreshGames } = useContext(GamesContext);
  const { players } = useContext(PlayersContext); // Get players data
  const [openDialog, setOpenDialog] = useState(false);
  const [gameToDelete, setGameToDelete] = useState(null);
  const [editMatch, setEditMatch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleDeleteClick = (game) => {
    setGameToDelete(game);
    setOpenDialog(true);
  };
  const SkeletonPlaceholder = () => (
    <Box>
      <Skeleton variant="rectangular" width="100%" height={10} />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </Box>
  );

  useEffect(() => {
    // Simulate loading for a few seconds (you can replace this with actual data fetching)
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after data fetching is complete
    }, 1000); // Adjust the duration as needed
  }, []);

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
      <MatchCreationForm></MatchCreationForm>
      {isLoading ? (
        <Box
          sx={{
            height: "150px", // Set the height of the Box
            display: "flex", // Enable Flexbox
            justifyContent: "center", // Center content horizontally
            alignItems: "center", // Center content vertically
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        games.map((game, index) => (
          <GameAccordion
            key={index}
            game={game}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        ))
      )}
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
