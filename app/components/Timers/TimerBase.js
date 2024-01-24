import React, { useState, useEffect } from "react";
import { Typography, Grid, Paper, Box } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LoadingBar from "../Loaders/LoadingBar";

const TimerBase = ({ targetTime, title, threshold }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const calculateTimeLeft = () => {
    const now = new Date();
    const targetDate = new Date(targetTime);

    let timeDifference = targetDate - now;
    if (timeDifference < 0) {
      // If the target time has passed, calculate for the next occurrence
      targetDate.setDate(targetDate.getDate() + 7);
      timeDifference = targetDate - now;
    }

    const secondsLeft = Math.floor(timeDifference / 1000);
    return secondsLeft;
  };

  useEffect(() => {
    // Calculate and set the initial time left
    setTimeLeft(calculateTimeLeft());

    // Update the time left every second
    const interval = setInterval(() => {
      const seconds = calculateTimeLeft();
      setTimeLeft(seconds);
    }, 1000);

    setIsLoading(false);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [targetTime]);

  const seconds = timeLeft % 60;
  const minutes = Math.floor((timeLeft / 60) % 60);
  const hours = Math.floor((timeLeft / 3600) % 24);
  const days = Math.floor(timeLeft / 86400);

  if (isLoading) {
    return <LoadingBar />;
  }

  if (days <= threshold) {
    return (
      <Paper elevation={3} style={{ padding: "16px" }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" alignItems="center">
              {title === "Match" ? (
                <EventIcon fontSize="large" />
              ) : (
                <AccessTimeIcon fontSize="large" />
              )}
              <Typography variant="h6" style={{ marginLeft: "8px" }}>
                {title}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3} style={{ textAlign: "center" }}>
            <Typography variant="h4">{days}</Typography>
            <Typography variant="caption">
              {days === 1 ? "Day" : "Days"}
            </Typography>
          </Grid>
          <Grid item xs={3} style={{ textAlign: "center" }}>
            <Typography variant="h4">{hours}</Typography>
            <Typography variant="caption">
              {hours === 1 ? "Hour" : "Hours"}
            </Typography>
          </Grid>
          <Grid item xs={3} style={{ textAlign: "center" }}>
            <Typography variant="h4">{minutes}</Typography>
            <Typography variant="caption">
              {minutes === 1 ? "Minute" : "Minutes"}
            </Typography>
          </Grid>
          <Grid item xs={3} style={{ textAlign: "center" }}>
            <Typography variant="h4">{seconds}</Typography>
            <Typography variant="caption">
              {seconds === 1 ? "Second" : "Seconds"}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  } else {
    return null;
  }
};

export default TimerBase;
