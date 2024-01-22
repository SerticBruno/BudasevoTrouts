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

  const assignTeamsBalanced = () => {
    let playersByPosition = { 1: [], 2: [], 3: [], 4: [], 5: [] };

    // Group players by position
    selectedPlayers.forEach((playerId) => {
      const player = players.find((p) => p._id === playerId);
      if (player && playersByPosition.hasOwnProperty(player.position)) {
        playersByPosition[player.position].push(playerId);
      }
    });

    let team1 = [],
      team2 = [];
    Object.keys(playersByPosition).forEach((position) => {
      let positionPlayers = playersByPosition[position];
      positionPlayers.sort(() => Math.random() - 0.5);

      // Distribute players to teams, with extra player going to the smaller team
      positionPlayers.forEach((playerId, index) => {
        if (
          index % 2 === 0 ||
          (index === positionPlayers.length - 1 && team1.length > team2.length)
        ) {
          team2.push(playerId);
        } else {
          team1.push(playerId);
        }
      });
    });

    // If teams are uneven, move a player from the larger team to the smaller team
    if (team1.length !== team2.length) {
      let [largerTeam, smallerTeam] =
        team1.length > team2.length ? [team1, team2] : [team2, team1];
      let moved = false;

      // Try to move a player while maintaining position balance
      for (let position = 1; position <= 5 && !moved; position++) {
        let playerToMove = largerTeam.find((playerId) => {
          return (
            players.find((p) => p._id === playerId).position == position &&
            smallerTeam.every(
              (pId) => players.find((p) => p._id === pId).position !== position
            )
          );
        });

        if (playerToMove) {
          largerTeam = largerTeam.filter((pId) => pId !== playerToMove);
          smallerTeam.push(playerToMove);
          moved = true;
        }
      }

      // Update the teams only if a player was moved
      if (moved) {
        if (team1.length > team2.length) {
          [team1, team2] = [largerTeam, smallerTeam];
        } else {
          [team2, team1] = [largerTeam, smallerTeam];
        }
      }
    }

    if (team1.length >= 5 && team2.length >= 5) {
      setFormError(""); // Clear the error message if the form is valid
    }

    setMatchDetails({
      ...matchDetails,
      team1,
      team2,
    });
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
                  onClick={assignTeamsBalanced}
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
