import React, { useState, useEffect } from "react";
import { Typography, Grid, Paper, Box } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import TimerBase from "./TimerBase";
import { calculateNextOccurance } from "../../utils/timers";

const MatchCountdownTimer = () => {
  const targetTime = calculateNextOccurance(3, 20, 0, 0);
  const title = "Match starts in";
  const threshold = 5;

  return (
    <TimerBase targetTime={targetTime} title={title} threshold={threshold} />
  );
};

export default MatchCountdownTimer;
