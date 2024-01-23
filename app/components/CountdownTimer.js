import React, { useState, useEffect } from "react";
import { Typography, Grid, Paper, Box } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  // Function to calculate the time remaining until 10:00 AM UTC+1 next Tuesday
  const calculateTimeLeft = () => {
    const now = new Date();
    const nextTuesday = new Date(now);
    nextTuesday.setUTCHours(9, 0, 0, 0); // Set to 9:00 AM UTC+1
    const daysUntilNextTuesday = (7 - now.getUTCDay() + 2) % 7; // Calculate days until next Tuesday
    nextTuesday.setDate(nextTuesday.getDate() + daysUntilNextTuesday);

    let timeDifference = nextTuesday - now;
    if (timeDifference < 0) {
      // If today is already Tuesday, calculate for next week
      nextTuesday.setDate(nextTuesday.getDate() + 7);
      timeDifference = nextTuesday - now;
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

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const seconds = timeLeft % 60;
  const minutes = Math.floor((timeLeft / 60) % 60);
  const hours = Math.floor((timeLeft / 3600) % 24);
  const days = Math.floor(timeLeft / 86400);
  if (days <= 5) {
    return (
      <Paper elevation={3} style={{ padding: "16px" }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <AccessTimeIcon fontSize="large" />
              <Typography variant="h6" style={{ marginLeft: "8px" }}>
                Sign ups in
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3} style={{ textAlign: "center" }}>
            <Typography variant="h4">{days}</Typography>
            <Typography variant="caption">{days === 1 ? 'Day' : 'Days'}</Typography>
          </Grid>
          <Grid item xs={3} style={{ textAlign: "center" }}>
            <Typography variant="h4">{hours}</Typography>
            <Typography variant="caption">Hours</Typography>
          </Grid>
          <Grid item xs={3} style={{ textAlign: "center" }}>
            <Typography variant="h4">{minutes}</Typography>
            <Typography variant="caption">Minutes</Typography>
          </Grid>
          <Grid item xs={3} style={{ textAlign: "center" }}>
            <Typography variant="h4">{seconds}</Typography>
            <Typography variant="caption">Seconds</Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  } else {
    // If there are more than 6 days remaining, return null to hide the timer
    return null;
  }
};

export default CountdownTimer;
