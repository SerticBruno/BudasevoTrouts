import React, { useState, useEffect } from "react";
import { Typography, Grid, Paper, Box } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import TimerBase from "./TimerBase";
import { calculateNextOccurance } from "../../utils/timers";

const DemoTimer = () => {
  const targetTime = calculateNextOccurance(3, 18, 45, 0);
  const title = "Amo jedan demo derani";
  const threshold = 5;

  return (
    <TimerBase targetTime={targetTime} title={title} threshold={threshold} />
  );
};

export default DemoTimer;
