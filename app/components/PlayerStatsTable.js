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
    marginright: 4, // spacing from the header text
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
              <TableCell align="right">#</TableCell>
              <TableCell
                align="right"
                onClick={() => handleSort("name")}
                sx={{ cursor: "pointer" }}
              >
                <Box display="flex" justifyContent="flex-end">
                  <Box mr={1}>Name</Box>
                  <Box>
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
                  </Box>
                </Box>
              </TableCell>

              <TableCell
                align="right"
                onClick={() => handleSort("gamesWon")}
                sx={{ cursor: "pointer" }}
              >
                <Box display="flex" justifyContent="flex-end">
                  <Box marginRight="8px">Won</Box>
                  <Box>
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
                  </Box>
                </Box>
              </TableCell>

              <TableCell
                align="right"
                onClick={() => handleSort("gamesLost")}
                sx={{ cursor: "pointer" }}
              >
                <Box display="flex" justifyContent="flex-end">
                  <Box marginRight="8px">Lost</Box>
                  <Box>
                    <ArrowUpwardIcon
                      style={sortIconStyle(
                        sortCriterion === "gamesLost" && sortDirection === "asc"
                      )}
                    />
                    <ArrowDownwardIcon
                      style={sortIconStyle(
                        sortCriterion === "gamesLost" &&
                          sortDirection === "desc"
                      )}
                    />
                  </Box>
                </Box>
              </TableCell>

              <TableCell
                align="right"
                onClick={() => handleSort("gamesPlayed")}
                sx={{ cursor: "pointer" }}
              >
                <Box display="flex" justifyContent="flex-end">
                  <Box marginRight="8px">Total</Box>
                  <Box>
                    <ArrowUpwardIcon
                      style={sortIconStyle(
                        sortCriterion === "gamesPlayed" &&
                          sortDirection === "asc"
                      )}
                    />
                    <ArrowDownwardIcon
                      style={sortIconStyle(
                        sortCriterion === "gamesPlayed" &&
                          sortDirection === "desc"
                      )}
                    />
                  </Box>
                </Box>
              </TableCell>

              <TableCell
                align="right"
                onClick={() => handleSort("longestWinStreak")}
                sx={{ cursor: "pointer" }}
              >
                <Box display="flex" justifyContent="flex-end">
                  <Box marginRight="8px">LWS</Box>
                  <Box>
                    <ArrowUpwardIcon
                      style={sortIconStyle(
                        sortCriterion === "longestWinStreak" &&
                          sortDirection === "asc"
                      )}
                    />
                    <ArrowDownwardIcon
                      style={sortIconStyle(
                        sortCriterion === "longestWinStreak" &&
                          sortDirection === "desc"
                      )}
                    />
                  </Box>
                </Box>
              </TableCell>

              <TableCell
                align="right"
                onClick={() => handleSort("longestLoseStreak")}
                sx={{ cursor: "pointer" }}
              >
                <Box display="flex" justifyContent="flex-end">
                  <Box marginRight="8px">LLS</Box>
                  <Box>
                    <ArrowUpwardIcon
                      style={sortIconStyle(
                        sortCriterion === "longestLoseStreak" &&
                          sortDirection === "asc"
                      )}
                    />
                    <ArrowDownwardIcon
                      style={sortIconStyle(
                        sortCriterion === "longestLoseStreak" &&
                          sortDirection === "desc"
                      )}
                    />
                  </Box>
                </Box>
              </TableCell>

              <TableCell
                align="right"
                onClick={() => handleSort("matchScore")}
                sx={{ cursor: "pointer" }}
              >
                <Box display="flex" justifyContent="flex-end">
                  <Box marginRight="8px">Score</Box>
                  <Box>
                    <ArrowUpwardIcon
                      style={sortIconStyle(
                        sortCriterion === "matchScore" &&
                          sortDirection === "asc"
                      )}
                    />
                    <ArrowDownwardIcon
                      style={sortIconStyle(
                        sortCriterion === "matchScore" &&
                          sortDirection === "desc"
                      )}
                    />
                  </Box>
                </Box>
              </TableCell>

              <TableCell
                align="right"
                onClick={() => handleSort("winRatio")}
                sx={{ cursor: "pointer" }}
              >
                <Box display="flex" justifyContent="flex-end">
                  <Box marginRight="8px">Win Rate</Box>
                  <Box>
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
                  </Box>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedPlayers.map((player, index) => (
              <TableRow key={player._id}>
                <TableCell component="th" scope="row" align="right">
                  {index + 1}.
                </TableCell>
                <TableCell align="right">{player.name}</TableCell>
                <TableCell align="right">{player.gamesWon}</TableCell>
                <TableCell align="right">{player.gamesLost}</TableCell>
                {/* <TableCell align="right">{player.gamesDraw}</TableCell> */}
                <TableCell align="right">{player.gamesPlayed}</TableCell>
                <TableCell align="right">{player.longestWinStreak}</TableCell>
                <TableCell align="right">{player.longestLoseStreak}</TableCell>
                <TableCell align="right">{player.matchScore}</TableCell>
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
