import React, { useContext } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"; // Import the Arrow Down icon
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"; // Import the Arrow Up icon
import PlayersContext from "../../../contexts/PlayersContext";

const TeamList = ({ team, onMovePlayer, direction, isFirst }) => {
  const { players } = useContext(PlayersContext);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <List>
      {team.map((playerId) => {
        const player = players.find((p) => p._id === playerId);
        return (
          <ListItem key={playerId}>
            <Box display="flex" alignItems="center" width="100%">
              {direction === "left" && !isMobile && (
                <IconButton onClick={() => onMovePlayer(playerId)}>
                  <ArrowBackIcon />
                </IconButton>
              )}

              {isMobile && isFirst === "1" && (
                <Box>
                  <IconButton onClick={() => onMovePlayer(playerId)}>
                    <ArrowDownwardIcon />
                  </IconButton>
                </Box>
              )}

              {isMobile && isFirst === "2" && (
                <Box>
                  <IconButton onClick={() => onMovePlayer(playerId)}>
                    <ArrowUpwardIcon />
                  </IconButton>
                </Box>
              )}

              <ListItemAvatar>
                <Avatar>{player?.name.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={player?.name}
                secondary={`Position: ${player?.position}`}
              />
              {direction === "right" && !isMobile && (
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
