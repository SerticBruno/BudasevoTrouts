"use client";

import React, { useContext, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import PlayersContext from "../contexts/PlayersContext";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const PlayerStatsTable = () => {
  const { players } = useContext(PlayersContext);
  const [sortCriterion, setSortCriterion] = useState("gamesPlayed");
  const [sortDirection, setSortDirection] = useState("desc");

  const sortIconStyle = (isActive) => ({
    fontSize: 16, // smaller icon size
    color: isActive ? "black" : "rgba(0, 0, 0, 0.24)", // active icons are darker
    verticalAlign: "middle", // align with text
    marginLeft: 4, // spacing from the header text
  });

  const handleSort = (criterion) => {
    const isAsc = sortCriterion === criterion && sortDirection === "asc";
    setSortCriterion(criterion);
    setSortDirection(isAsc ? "desc" : "asc");
  };

  const sortPlayers = (players, criterion, direction) => {
    return [...players].sort((a, b) => {
      let aValue = a[criterion];
      let bValue = b[criterion];

      // If the criterion is 'winRatio', parse the values as floats
      if (criterion === "winRatio") {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }

      if (aValue < bValue) {
        return direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const sortedPlayers = sortPlayers(players, sortCriterion, sortDirection);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Player Statistics
      </Typography>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort("name")}>
                Name
                <ArrowUpwardIcon
                  style={sortIconStyle(
                    sortCriterion === "name" && sortDirection === "asc"
                  )}
                />
                <ArrowDownwardIcon
                  style={sortIconStyle(
                    sortCriterion === "name" && sortDirection === "desc"
                  )}
                />
              </TableCell>

              <TableCell
                align="right"
                onClick={() => handleSort("gamesPlayed")}
              >
                Matches Played
                <ArrowUpwardIcon
                  style={sortIconStyle(
                    sortCriterion === "gamesPlayed" && sortDirection === "asc"
                  )}
                />
                <ArrowDownwardIcon
                  style={sortIconStyle(
                    sortCriterion === "gamesPlayed" && sortDirection === "desc"
                  )}
                />
              </TableCell>
              <TableCell align="right" onClick={() => handleSort("gamesWon")}>
                Games Won
                <ArrowUpwardIcon
                  style={sortIconStyle(
                    sortCriterion === "gamesWon" && sortDirection === "asc"
                  )}
                />
                <ArrowDownwardIcon
                  style={sortIconStyle(
                    sortCriterion === "gamesWon" && sortDirection === "desc"
                  )}
                />
              </TableCell>
              {/* More headers */}
              <TableCell align="right" onClick={() => handleSort("gamesLost")}>
                Games Lost
                <ArrowUpwardIcon
                  style={sortIconStyle(
                    sortCriterion === "gamesLost" && sortDirection === "asc"
                  )}
                />
                <ArrowDownwardIcon
                  style={sortIconStyle(
                    sortCriterion === "gamesLost" && sortDirection === "desc"
                  )}
                />
              </TableCell>
              <TableCell align="right" onClick={() => handleSort("gamesDraw")}>
                Games Draw
                <ArrowUpwardIcon
                  style={sortIconStyle(
                    sortCriterion === "gamesDraw" && sortDirection === "asc"
                  )}
                />
                <ArrowDownwardIcon
                  style={sortIconStyle(
                    sortCriterion === "gamesDraw" && sortDirection === "desc"
                  )}
                />
              </TableCell>
              <TableCell align="right" onClick={() => handleSort("winRatio")}>
                Win Rate
                <ArrowUpwardIcon
                  style={sortIconStyle(
                    sortCriterion === "winRatio" && sortDirection === "asc"
                  )}
                />
                <ArrowDownwardIcon
                  style={sortIconStyle(
                    sortCriterion === "winRatio" && sortDirection === "desc"
                  )}
                />
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedPlayers.map((player) => (
              <TableRow key={player._id}>
                <TableCell component="th" scope="row">
                  {player.name}
                </TableCell>
                <TableCell align="right">{player.gamesPlayed}</TableCell>
                <TableCell align="right">{player.gamesWon}</TableCell>
                <TableCell align="right">{player.gamesLost}</TableCell>
                <TableCell align="right">{player.gamesDraw}</TableCell>
                {/* Add more TableCell for other data */}

                <TableCell align="right">{player.winRatio}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default PlayerStatsTable;
