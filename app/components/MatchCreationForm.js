"use client";

import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import GamesContext from "../contexts/GamesContext";
import PlayersContext from "../contexts/PlayersContext";
import RemoveIcon from "@mui/icons-material/Remove";
import Avatar from '@mui/material/Avatar';


const MatchCreationForm = ({ onMatchCreate }) => {
  const today = new Date().toISOString().split("T")[0];
  const { players } = useContext(PlayersContext);
  const { refreshGames } = useContext(GamesContext);
  const [matchDetails, setMatchDetails] = useState({
    name: "",
    date: today,
    location: "",
    team1: [],
    team2: [],
  });
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const renderPlayerListItem = (playerId) => {
    const player = players.find(p => p._id === playerId);
    if (player) {
      return (
        <ListItem key={playerId}>
          <Avatar sx={{ bgcolor: "gray", mr: 2 }}>{player.name.charAt(0)}</Avatar>
          <ListItemText primary={player.name} secondary={`Position: ${player.position}`} />
        </ListItem>
      );
    }
    return null;
  };

  const handleChange = (event) => {
    setMatchDetails({
      ...matchDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddPlayer = (playerId) => {
    if (selectedPlayers.length < 14 && !selectedPlayers.includes(playerId)) {
      setSelectedPlayers([...selectedPlayers, playerId]);
    }
  };

  const handleRemovePlayer = (playerId) => {
    setSelectedPlayers(selectedPlayers.filter((id) => id !== playerId));
  };

  const assignTeamsBalanced = () => {
    let playersByPosition = { '1': [], '2': [], '3': [], '4': [], '5': [] };
  
    // Group players by position
    selectedPlayers.forEach((playerId) => {
      const player = players.find((p) => p._id === playerId);
      if (player && playersByPosition.hasOwnProperty(player.position)) {
        playersByPosition[player.position].push(playerId);
      }
    });
  
    let team1 = [], team2 = [];
    Object.keys(playersByPosition).forEach((position) => {
      let positionPlayers = playersByPosition[position];
      positionPlayers.sort(() => Math.random() - 0.5);
  
      // Distribute players to teams, with extra player going to the smaller team
      positionPlayers.forEach((playerId, index) => {
        if (index % 2 === 0 || (index === positionPlayers.length - 1 && team1.length > team2.length)) {
          team2.push(playerId);
        } else {
          team1.push(playerId);
        }
      });
    });
  
    // If teams are uneven, move a player from the larger team to the smaller team
    if (team1.length !== team2.length) {
      let [largerTeam, smallerTeam] = team1.length > team2.length ? [team1, team2] : [team2, team1];
      let moved = false;
  
      // Try to move a player while maintaining position balance
      for (let position = 1; position <= 5 && !moved; position++) {
        let playerToMove = largerTeam.find(playerId => {
          return players.find(p => p._id === playerId).position == position &&
                 smallerTeam.every(pId => players.find(p => p._id === pId).position !== position);
        });
        
        if (playerToMove) {
          largerTeam = largerTeam.filter(pId => pId !== playerToMove);
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
  
    setMatchDetails({
      ...matchDetails,
      team1,
      team2,
    });
  };
  

  const getPlayerNamesByIds = (selectedIds) => {
    return selectedIds
      .map((id) => players.find((player) => player._id === id)?.name)
      .filter((name) => name)
      .join(", ");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      console.log("Match created:", data);
      await refreshGames();
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
            <FormControl fullWidth>
              <InputLabel>Select 14 Players</InputLabel>
              <Select
                multiple
                value={selectedPlayers}
                onChange={(e) => {
                  setSelectedPlayers(e.target.value);
                }}
                renderValue={(selected) =>
                  getPlayerNamesByIds(selected).split(", ").join(", ")
                }
                label="Select 14 Players"
              >
                {players.map((player) => (
                  <MenuItem key={player._id} value={player._id}>
                    {player.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              onClick={assignTeamsBalanced} // Changed to use the new balanced assignment
              sx={{ mt: 2 }}
            >
              Assign Teams Balanced
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Team 1 Players</Typography>
            <List>
              {matchDetails.team1.map(renderPlayerListItem)}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Team 2 Players</Typography>
            <List>
              {matchDetails.team2.map(renderPlayerListItem)}
            </List>
          </Grid>
        </Grid>
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
      <form onSubmit={handleSubmit}>
        {/* Form content unchanged */}
        {/* Remaining form content unchanged */}
      </form>
    </Paper>
  );
};

export default MatchCreationForm;