"use client";

import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Fade,
  Box,
  Modal,
  Grid,
  ListItem,
  ListItemText,
} from "@mui/material";
import GamesContext from "../contexts/GamesContext";
import PlayersContext from "../contexts/PlayersContext";
import TeamList from "./TeamList"; // Import TeamList component
import PlayerSelection from "./PlayerSelection";
import { assignTeamsBalanced } from "../utils/teamsBalancer";

const MatchCreationModal = ({ open, onClose }) => {
  const today = new Date().toISOString().split("T")[0];
  const { players, fetchPlayers } = useContext(PlayersContext);
  const { refreshGames } = useContext(GamesContext);
  const [formError, setFormError] = useState("");
  const [matchDetails, setMatchDetails] = useState({
    name: "",
    date: today,
    location: "",
    team1: [],
    team1Score: 0,
    team2: [],
    team2Score: 0,
  });
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const handleChange = (event) => {
    setMatchDetails({
      ...matchDetails,
      [event.target.name]: event.target.value,
    });
  };

  const movePlayerToTeam = (playerId, fromTeam, toTeam) => {
    setMatchDetails((prevState) => {
      const newFromTeam = prevState[fromTeam].filter((id) => id !== playerId);
      const newToTeam = [...prevState[toTeam], playerId];
      return { ...prevState, [fromTeam]: newFromTeam, [toTeam]: newToTeam };
    });
  };

  const handleAssignTeams = () => {


    const balancedTeams = assignTeamsBalanced(
      selectedPlayers,
      players,
    );

    if (
      Array.isArray(balancedTeams.team1) &&
      Array.isArray(balancedTeams.team2)
    ) {
      setFormError(""); // Clear the error message if the form is valid
      setMatchDetails({
        ...matchDetails,
        team1: balancedTeams.team1,
        team2: balancedTeams.team2,
      });
    } else {
      setFormError("Could not form balanced teams.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const totalPlayers = selectedPlayers.length;
    const minPlayersRequired = 10;

    console.log(totalPlayers);

    if (totalPlayers < minPlayersRequired) {
      setFormError(
        `A minimum of ${minPlayersRequired} players is required to create a match.`
      );
      return;
    }

    if (matchDetails.team1.length < 5 || matchDetails.team2.length < 5) {
      setFormError("Please assign players to both Team 1 and Team 2.");
      return;
    }

    setFormError(""); // Clear the error message if the form is valid

    try {
      const response = await fetch("/api/matches/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(matchDetails),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      refreshGames();
      fetchPlayers();
      setMatchDetails({
        name: "",
        date: today,
        location: "",
        team1: [],
        team2: [],
      });
      setSelectedPlayers([]);
    } catch (error) {
      console.error("Failed to create match:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open}>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Paper
            elevation={3}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: "1200px",
              bgcolor: "background.paper",
              borderRadius: "8px",
              boxShadow: 24,
              p: 4,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxHeight: "80vh", // Add a maximum height to allow scrolling
              overflowY: "auto", // Enable vertical scrolling if the content exceeds the maximum height
            }}
          >
            <Grid container spacing={1}>
              <Typography variant="h5">Create a Match</Typography>
              <Grid item xs={12}>
                <TextField
                  label="Match Name"
                  name="name"
                  value={matchDetails.name}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Match Date"
                  name="date"
                  type="date"
                  value={matchDetails.date}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Location"
                  name="location"
                  value={matchDetails.location}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <PlayerSelection
                  players={players}
                  selectedPlayers={selectedPlayers}
                  setSelectedPlayers={setSelectedPlayers}
                />
                <Button
                  variant="outlined"
                  onClick={handleAssignTeams}
                  sx={{ mt: 1 }}
                >
                  Assign Teams Balanced
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6">Team 1 Players</Typography>
                <TeamList
                  team={matchDetails.team1}
                  onMovePlayer={(playerId) =>
                    movePlayerToTeam(playerId, "team1", "team2")
                  }
                  direction="right"
                  isFirst="1"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6">Team 2 Players</Typography>
                <TeamList
                  team={matchDetails.team2}
                  onMovePlayer={(playerId) =>
                    movePlayerToTeam(playerId, "team2", "team1")
                  }
                  direction="left"
                  isFirst="2"
                />
              </Grid>
            </Grid>

            {formError && (
              <Typography color="error" sx={{ mt: 2 }}>
                {formError}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{
                mt: 2,
                color: "black", // Dark text color when not hovered
                "&:hover": {
                  color: "white", // Text color changes to white on hover
                  // The background color will automatically change based on the theme's primary color
                },
              }}
            >
              Create Match
            </Button>
          </Paper>
        </Box>
      </Fade>
    </Modal>
  );
};

export default MatchCreationModal;
