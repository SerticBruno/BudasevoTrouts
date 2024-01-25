import React from "react";
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

const MatchAccordion = ({ game, onEdit, onDelete }) => {
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
    const team1Score = Number(game.team1Score);
    const team2Score = Number(game.team2Score);

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

  const movePlayerToTeam = (playerId, fromTeam, toTeam) => {
    setMatchDetails((prevState) => {
      const newFromTeam = prevState[fromTeam].filter((id) => id !== playerId);
      const newToTeam = [...prevState[toTeam], playerId];
      return { ...prevState, [fromTeam]: newFromTeam, [toTeam]: newToTeam };
    });
  };

  const determineForTeam2 = () => {
    // Ensure that both scores are numbers before comparing
    const team1Score = Number(game.team1Score);
    const team2Score = Number(game.team2Score);

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

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">
          {game.name ? game.name + "  -" : formatDate(game.date) + " -"}{" "}
          {game.team1Score ? game.team1Score : 0} :{" "}
          {game.team2Score ? game.team2Score : 0}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Match Details:</Typography>
            <Typography>Name: {game.name}</Typography>
            <Typography>Location: {game.location}</Typography>
            <Typography>Status: {game.status}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" style={{ margin: "10px 0" }}>
              {determineForTeam1()}
            </Typography>
            <Typography variant="subtitle1">Team 1:</Typography>
            <TeamList
              team={game.team1}
              onMovePlayer={(playerId) =>
                movePlayerToTeam(playerId, "team1", "team2")
              }
              direction="right"
              isFirst="1"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" style={{ margin: "10px 0" }}>
              {determineForTeam2()}
            </Typography>
            <Typography variant="subtitle1">Team 2:</Typography>
            <TeamList
              team={game.team2}
              onMovePlayer={(playerId) =>
                movePlayerToTeam(playerId, "team1", "team2")
              }
              direction="right"
              isFirst="2"
            />
          </Grid>
        </Grid>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Grid container justifyContent="flex-end">
          <IconButton onClick={() => onEdit(game)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(game)}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default MatchAccordion;
