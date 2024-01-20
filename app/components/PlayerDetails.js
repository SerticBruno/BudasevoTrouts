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
    labels: ["Games Played", "Wins", "Draws", "Losses"],
    datasets: [
      {
        label: `Performance Against ${player.mostCommonOpponent}`,
        data: [
          player.gamesPlayedAgainstMostCommon,
          player.winsAgainstMostCommon,
          player.drawsAgainstMostCommon,
          player.lossesAgainstMostCommon,
        ],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.success.main,
          theme.palette.info.main,
          theme.palette.error.main,
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


      <Typography variant="subtitle2">
        Games Played: {player.gamesPlayed}
      </Typography>
      <Typography variant="subtitle2">Games Won: {player.gamesWon}</Typography>
      <Typography variant="subtitle2">
        Games Lost: {player.gamesLost}
      </Typography>
      <Typography variant="subtitle2">
        Games Draw: {player.gamesDraw}
      </Typography>
      <Typography variant="subtitle2">
        Total Matches: {player.totalMatches}
      </Typography>

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

      
      <Typography variant="subtitle2">
        Most Common Opponent: {player.mostCommonOpponent}
      </Typography>
      <Typography variant="subtitle2">
        Games Against {player.mostCommonOpponent}:{" "}
        {player.gamesPlayedAgainstMostCommon}
      </Typography>
      <Typography variant="subtitle2">
        Wins Against {player.mostCommonOpponent}: {player.winsAgainstMostCommon}
      </Typography>
      <Typography variant="subtitle2">
        Draws Against {player.mostCommonOpponent}:{" "}
        {player.winsAgainstMostCommon}
      </Typography>
      <Typography variant="subtitle2">
        Losses Against {player.mostCommonOpponent}:{" "}
        {player.winsAgainstMostCommon}
      </Typography>

      <Box my={2} sx={{ maxWidth: 400 }}>
        <Typography>
          Performance Against {player.mostCommonOpponent}
        </Typography>
        <Bar data={opponentData} options={chartOptions} />
      </Box>
    </Box>
  );
};

export default PlayerDetails;
