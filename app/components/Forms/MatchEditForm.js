"use client";

import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Box,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import GamesContext from "../../contexts/GamesContext";
import PlayersContext from "../../contexts/PlayersContext";
import TeamList from "./FormComponents/TeamList";

const MatchEditForm = ({ match, open, onClose, onSave }) => {
  const [matchDetails, setMatchDetails] = useState({
    ...match,
    team1Score: match?.team1Score || 0,
    team2Score: match?.team2Score || 0,
  });
  const { refreshGames } = useContext(GamesContext);
  const { fetchPlayers } = useContext(PlayersContext);

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

  const determineForTeam1 = () => {
    // Ensure that both scores are numbers before comparing
    const team1Score = Number(matchDetails.team1Score);
    const team2Score = Number(matchDetails.team2Score);

    if (team1Score == 0 && team2Score == 0) {
      return ""; // Or any other default message you prefer
    }

    if (team1Score > team2Score) {
      return "Winners";
    } else if (team2Score > team1Score) {
      return "Luzeri";
    } else {
      return "Draw";
    }
  };

  const determineForTeam2 = () => {
    // Ensure that both scores are numbers before comparing
    const team1Score = Number(matchDetails.team1Score);
    const team2Score = Number(matchDetails.team2Score);

    if (team1Score == 0 && team2Score == 0) {
      return ""; // Or any other default message you prefer
    }

    if (team1Score > team2Score) {
      return "Luzeri";
    } else if (team2Score > team1Score) {
      return "Winners";
    } else {
      return "Draw";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/matches/${match._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(matchDetails),
      });
      if (!response.ok) {
        throw new Error("Failed to update match");
      }
      onClose();
      onSave();
      refreshGames();
      fetchPlayers(); // Refresh player stats after match update
    } catch (error) {
      console.error("Error updating match:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Match</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Match Name"
            name="name"
            value={matchDetails.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date"
            name="date"
            type="date"
            value={matchDetails.date}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Location"
            name="location"
            value={matchDetails.location}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <Grid container spacing={2}>
            <Grid item xs={12} display={"flex"} justifyContent={"space-around"}>
              <Grid item xs={12} md={5}>
                <TextField
                  label="Team 1 Score"
                  name="team1Score"
                  type="number"
                  value={matchDetails.team1Score}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12} md={5}>
                <TextField
                  label="Team 2 Score"
                  name="team2Score"
                  type="number"
                  value={matchDetails.team2Score}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">Team 1</Typography>
              <Typography variant="h6" style={{ margin: "10px 0" }}>
                {determineForTeam1()}
              </Typography>
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
              <Typography variant="subtitle1">Team 2</Typography>
              <Typography variant="h6" style={{ margin: "10px 0" }}>
                {determineForTeam2()}
              </Typography>
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

          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MatchEditForm;
