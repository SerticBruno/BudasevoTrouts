import React, { useContext } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Box } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayersContext from "../contexts/PlayersContext";

const TeamList = ({ team, onMovePlayer, direction }) => {
  const { players } = useContext(PlayersContext);

  // Define custom CSS style for ListItem to adjust padding
  const listItemStyle = {
    marginBottom: '8px', // Adjust this value to control the padding between players
  };

  return (
    <List>
      {team.map((playerId) => {
        const player = players.find((p) => p._id === playerId);
        return (
          <ListItem key={playerId} style={listItemStyle}>
            <Box display="flex" alignItems="center" width="100%">
              {direction === 'left' && (
                <IconButton onClick={() => onMovePlayer(playerId)}>
                  <ArrowBackIcon />
                </IconButton>
              )}
              <ListItemAvatar>
                <Avatar>{player?.name.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={player?.name}
                secondary={`Position: ${player?.position}`}
              />
              {direction === 'right' && (
                <IconButton onClick={() => onMovePlayer(playerId)}>
                  <ArrowForwardIcon />
                </IconButton>
              )}
            </Box>
          </ListItem>
        );
      })}
    </List>
  );
};

export default TeamList;
