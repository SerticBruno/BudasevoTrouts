import React, { useState, useEffect } from "react";
import { Typography, Grid, Paper, Box } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import TimerBase from "./TimerBase";
import { calculateNextOccurance } from "../../utils/timers";

const SignupTimer = () => {
  const targetTime = calculateNextOccurance(2, 9, 0, 0);
  const title = "Sign ups in";
  const threshold = 3;

  return (
    <TimerBase
      targetTime={targetTime}
      title={title}
      threshold={threshold}
    />
  );
};

export default SignupTimer;
