"use client";
// components/PlayerCreationForm.js

import React, { useState, useContext } from "react";
import { TextField, Button, Typography, Box, Paper, Grid } from "@mui/material";
import PlayersContext from "../contexts/PlayersContext";
import CourtPositionSelector from "./CourtPositionSelector";

const PlayerCreationForm = ({ onPlayerCreate }) => {
  const { fetchPlayers } = useContext(PlayersContext); // Using the context
  const [playerDetails, setPlayerDetails] = useState({
    name: "",
    position: "",
    score: 0,
  });

  const handleChange = (event) => {
    setPlayerDetails({
      ...playerDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handlePositionSelect = (position) => {
    setPlayerDetails({ ...playerDetails, position });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/players/create", {
        // Adjust the API endpoint as needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(playerDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to create player");
      }

      const data = await response.json();
      // onPlayerCreate(data); // Callback function to handle the newly created player
      await fetchPlayers(); // Re-fetch or update the context after successful creation
      setPlayerDetails({ name: "", position: "", score: 0 }); // Reset the form
    } catch (error) {
      console.error("Error creating player:", error);
      // Handle errors here (e.g., show error message to the user)
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Add Player
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Player Name"
              name="name"
              value={playerDetails.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Position"
              name="position"
              value={playerDetails.position}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <CourtPositionSelector
              imageSrc="/pngs/courtpositions.png" // Replace with your image path
              onSelectPosition={handlePositionSelect}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Score"
              name="score"
              type="number"
              value={playerDetails.score}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                color: "black", // Dark text color when not hovered
                "&:hover": {
                  color: "white", // Text color changes to white on hover
                  // The background color will automatically change based on the theme's primary color
                },
              }}
            >
              Add Player
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default PlayerCreationForm;
