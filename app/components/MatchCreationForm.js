"use client";

import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  ListItem,
  ListItemText,
} from "@mui/material";
import GamesContext from "../contexts/GamesContext";
import PlayersContext from "../contexts/PlayersContext";
import TeamList from "./TeamList"; // Import TeamList component
import PlayerSelection from "./PlayerSelection";

const MatchCreationForm = ({ onMatchCreate }) => {
  const today = new Date().toISOString().split("T")[0];
  const { players, refreshPlayers } = useContext(PlayersContext);
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
      refreshPlayers();
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
    <Paper elevation={3} sx={{ p: 4, marginTop: 4, marginBottom: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 5 }}>
        Create a Match
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
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
          <Grid item xs={12}>
            <PlayerSelection
              players={players}
              selectedPlayers={selectedPlayers}
              setSelectedPlayers={setSelectedPlayers}
            />
            <Button
              variant="outlined"
              onClick={assignTeamsBalanced}
              sx={{ mt: 2 }}
            >
              Assign Teams Balanced
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Team 1 Players</Typography>
              <TeamList 
                team={matchDetails.team1} 
                onMovePlayer={(playerId) => movePlayerToTeam(playerId, 'team1', 'team2')} 
                direction="right" 
              />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Team 2 Players</Typography>
              <TeamList 
                team={matchDetails.team2} 
                onMovePlayer={(playerId) => movePlayerToTeam(playerId, 'team2', 'team1')} 
                direction="left" 
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
      </form>
    </Paper>
  );
};

export default MatchCreationForm;
