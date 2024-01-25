"use client";

import React, { useState, useContext } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Grid,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TeamList from "../Forms/FormComponents/TeamList";
import GamesContext from "../../contexts/GamesContext";
import PlayersContext from "../../contexts/PlayersContext";

const MatchAccordion = ({ match, onEdit, onDelete }) => {
  const [matchDetails, setMatchDetails] = useState({
    ...match,
    team1Score: match?.team1Score || 0,
    team2Score: match?.team2Score || 0,
  });
  const { refreshGames } = useContext(GamesContext);
  const { fetchPlayers } = useContext(PlayersContext);

  const formatDate = (dateString) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${months[monthIndex]}, ${year}`;
  };

  const determineForTeam1 = () => {
    // Ensure that both scores are numbers before comparing
    const team1Score = Number(match.team1Score);
    const team2Score = Number(match.team2Score);

    if (team1Score == 0 && team2Score == 0) {
      return ""; // Or any other default message you prefer
    }

    if (team1Score > team2Score) {
      return "Pobjednici";
    } else if (team2Score > team1Score) {
      return "Nepobjednici";
    } else {
      return "Jednako";
    }
  };

  const movePlayerToTeam = (playerId, fromTeam, toTeam) => {
    console.log(playerId);
    console.log(fromTeam);
    console.log(toTeam);
    setMatchDetails((prevState) => {
      const newFromTeam = prevState[fromTeam].filter((id) => id !== playerId);
      const newToTeam = [...prevState[toTeam], playerId];
      return { ...prevState, [fromTeam]: newFromTeam, [toTeam]: newToTeam };
    });
  };

  const determineForTeam2 = () => {
    // Ensure that both scores are numbers before comparing
    const team1Score = Number(match.team1Score);
    const team2Score = Number(match.team2Score);

    if (team1Score == 0 && team2Score == 0) {
      return ""; // Or any other default message you prefer
    }

    if (team1Score > team2Score) {
      return "Nepobjednici";
    } else if (team2Score > team1Score) {
      return "Pobjednici";
    } else {
      return "Jednako";
    }
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">
          {match.name ? match.name + "  -" : formatDate(match.date) + " -"}{" "}
          {match.team1Score ? match.team1Score : 0} :{" "}
          {match.team2Score ? match.team2Score : 0}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Match Details:</Typography>
            <Typography>Name: {match.name}</Typography>
            <Typography>Location: {match.location}</Typography>
            <Typography>Status: {match.status}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" style={{ margin: "10px 0" }}>
              {determineForTeam1()}
            </Typography>
            <Typography variant="subtitle1">Team 1:</Typography>
            <TeamList
              team={match.team1}
              onMovePlayer={(playerId) =>
                movePlayerToTeam(playerId, "team1", "team2")
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" style={{ margin: "10px 0" }}>
              {determineForTeam2()}
            </Typography>
            <Typography variant="subtitle1">Team 2:</Typography>
            <TeamList
              team={match.team2}
              onMovePlayer={(playerId) =>
                movePlayerToTeam(playerId, "team2", "team1")
              }
            />
          </Grid>
        </Grid>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Grid container justifyContent="flex-end">
          <IconButton onClick={() => onEdit(match)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(match)}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default MatchAccordion;
