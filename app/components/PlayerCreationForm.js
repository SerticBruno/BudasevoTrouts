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

  const [errors, setErrors] = useState({ name: "", position: "", score: "" });

  const validateForm = () => {
    let tempErrors = { name: "", position: "", score: "" };
    let isValid = true;

    if (!playerDetails.name) {
      tempErrors.name = "Player name is required";
      isValid = false;
    }
    if (!playerDetails.position) {
      tempErrors.position = "Position is required";
      isValid = false;
    }
    if (playerDetails.score === 0) {
      tempErrors.score = "Score cannot be zero";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (event) => {
    setPlayerDetails({
      ...playerDetails,
      [event.target.name]: event.target.value,
    });
    // Clear errors when user starts typing
    setErrors({ ...errors, [event.target.name]: "" });
  };

  const handlePositionSelect = (position) => {
    setPlayerDetails({ ...playerDetails, position });
    setErrors({ ...errors, position: "" }); // Clear position error
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return; // Stop the form submission if validation fails

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
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Player Name"
              name="name"
              value={playerDetails.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!errors.name}
              helperText={errors.name}
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
              error={!!errors.position}
              helperText={errors.position}
            />
          </Grid>
          <Grid item xs={12} >
            <CourtPositionSelector
              imageSrc="/pngs/courtpositions.png"
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
              error={!!errors.score}
              helperText={errors.score}
            />
          </Grid>
          <Grid item xs={12}>
          <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 2,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 'bold',
                backgroundColor: 'primary', // Adjust color as needed
                color: 'black', // Ensuring text is white for contrast
                '&:hover': {
                  backgroundColor: 'primary', // Darker on hover
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
