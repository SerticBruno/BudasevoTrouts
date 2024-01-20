import React from "react";
import { Box, Typography, LinearProgress, useTheme } from "@mui/material";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PlayerDetails = ({ player }) => {
  const theme = useTheme();
  const winRateProgress = player.winRatio;

  const gamesPlayed = player.gamesPlayed;
  const gamesNotPlayed = player.totalMatches - gamesPlayed;

  // Customizing the pie chart's colors
  const pieColors = [
    theme.palette.success.main,
    theme.palette.error.main,
    theme.palette.info.main,
  ];

  const pieData = {
    labels: ["Wins", "Losses", "Draws"],
    datasets: [
      {
        label: "Game Outcomes",
        data: [player.gamesWon, player.gamesLost, player.gamesDraw],
        backgroundColor: pieColors,
      },
    ],
  };

  const opponentData = {
    labels: ["Games Played", "Wins", "Losses", "Draws"],
    datasets: [
      {
        label: `Performance Against ${player.mostCommonOpponent}`,
        data: [
          player.gamesPlayedAgainstMostCommon,
          player.winsAgainstMostCommon,
          player.lossesAgainstMostCommon,
          player.drawsAgainstMostCommon,
        ],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.success.main,
          theme.palette.error.main,
          theme.palette.info.main,
        ],
      },
    ],
  };

  const attendanceData = {
    labels: ["Games Played", "Games Not Played"],
    datasets: [
      {
        label: "Match Attendance",
        data: [gamesPlayed, gamesNotPlayed],
        backgroundColor: [theme.palette.primary.main, theme.palette.grey[300]],
      },
    ],
  };

  const teammateResultsData = {
    labels: ["Wins", "Losses", "Draws"],
    datasets: [
      {
        label: "Results with " + player.mostCommonTeammateName,
        data: [
          player.winsWithMostCommonTeammate,
          player.lossesWithMostCommonTeammate,
          player.drawsWithMostCommonTeammate,
        ],
        backgroundColor: [
          theme.palette.success.main,
          theme.palette.error.main,
          theme.palette.warning.main,
        ],
      },
    ],
  };

  const teammateWinsData = {
    labels: ["Total Games", "Wins", "Losses", "Draws"],
    datasets: [
      {
        label: `Results with ${player.teammateWithMostWinsName}`,
        data: [
          player.teammateWithMostWinsCount + player.teammateWithMostWinsLossesCount + player.drawsWithTeammateWithMostWins,
          player.teammateWithMostWinsCount,
          player.teammateWithMostWinsLossesCount,
          player.drawsWithTeammateWithMostWins,
        ],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.success.main,
          theme.palette.info.main,
          theme.palette.warning.main,
        ],
      },
    ],
  };

  const teammateWithMostLossesData = {
    labels: ["Total Games", "Wins", "Losses", "Draws"],
    datasets: [
      {
        label: `Results with ${player.teammateWithMostLossesName}`,
        data: [ 
          player.teammateWithMostLossesWinsCount + player.teammateWithMostLossesCount + player.teammateWithMostLossesDrawsCount,
          player.teammateWithMostLossesWinsCount,
          player.teammateWithMostLossesCount,
          player.teammateWithMostLossesDrawsCount,
        ],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.success.main,
          theme.palette.error.main,
          theme.palette.warning.main,
        ],
      },
    ],
  };

  console.log(player.teammateWithMostLossesWinsCount);
  console.log(player.teammateWithMostLossesCount);
  console.log(player.teammateWithMostLossesDrawsCount);

  const chartOptions = {
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        position: "bottom", // Adjust the legend position
      },
    },
  };

  return (
    <Box>
      <Typography variant="subtitle1">Name: {player.name}</Typography>
      <Typography variant="subtitle2">Position: {player.position}</Typography>
      <Typography variant="subtitle2">Score: {player.score}</Typography>

      <Box my={2} sx={{ maxWidth: 400 }}>
        <Typography>Win Ratio</Typography>
        <Box display="flex" alignItems="center">
          <LinearProgress
            variant="determinate"
            value={winRateProgress}
            sx={{ flexGrow: 1, mr: 1, height: 10 }} // Custom height
            color="primary" // Change as needed
          />
          <Typography>{winRateProgress}%</Typography>
        </Box>
      </Box>

      <Box my={2} sx={{ maxWidth: 400 }}>
        <Typography>Game Outcomes</Typography>
        <Pie data={pieData} options={chartOptions} />
      </Box>
      <Box my={2} sx={{ maxWidth: 400 }}>
        <Typography>Match Attendance</Typography>
        <Pie data={attendanceData} options={chartOptions} />
      </Box>

      <Box my={2} sx={{ maxWidth: 400 }}>
        <Typography>
          Most common teammate: {player.mostCommonTeammateName}
        </Typography>
        <Typography>Results with {player.mostCommonTeammateName}</Typography>
        <Pie data={teammateResultsData} options={chartOptions} />
      </Box>

      <Box my={2} sx={{ maxWidth: 400 }}>
        <Typography>
          Most Common Opponent: {player.mostCommonOpponent}
        </Typography>
        <Typography>Performance Against {player.mostCommonOpponent}</Typography>
        <Bar data={opponentData} options={chartOptions} />
      </Box>
      
      <Box my={2} sx={{ maxWidth: 400 }}>
        <Typography variant="subtitle2">
          Teammate with most wins: {player.teammateWithMostWinsName}
        </Typography>
        <Bar data={teammateWinsData} options={chartOptions} />
      </Box>
      <Box my={2} sx={{ maxWidth: 400 }}>
        <Typography variant="subtitle2">
          Teammate with most losses: {player.teammateWithMostLossesName}
        </Typography>
        <Bar data={teammateWithMostLossesData} options={chartOptions} />
      </Box>
    </Box>
  );
};

export default PlayerDetails;
