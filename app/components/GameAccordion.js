import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, IconButton, Grid, Divider } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TeamList from './TeamList';

const GameAccordion = ({ game, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    return `${day} ${months[monthIndex]}, ${year}`;
  };
  
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">{game.name ? game.name + "  -" : formatDate(game.date) + " -" } {game.team1Score ? game.team1Score : 0} : {game.team2Score ? game.team2Score : 0}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Match Details:</Typography>
            <Typography>Name: {game.name}</Typography>
            <Typography>Location: {game.location}</Typography>
            <Typography>Status: {game.status}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Team 1:</Typography>
            <TeamList team={game.team1} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Team 2:</Typography>
            <TeamList team={game.team2} />
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

export default GameAccordion;
