// GameTimer.js

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Box, TextField, Paper } from "@mui/material";
import { styled } from "@mui/system";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const FullscreenContainer = styled("div")({
  fontSize: "50rem",
  textAlign: "center",
  fontFamily: "monospace",
  minHeight: "120vh",
  marginTop: "10px",
});

const TimerContainer = styled("div")({
  fontSize: "1rem",
  textAlign: "center",
  fontFamily: "monospace",
});

const ButtonContainer = styled("div")({
  display: "flex",
  gap: "10px",
});

const GameTimer = ({ initialDuration }) => {
  const [duration, setDuration] = useState(initialDuration * 60); // Convert minutes to seconds
  const [isActive, setIsActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [inputMinutes, setInputMinutes] = useState(initialDuration);

  useEffect(() => {
    setDuration(inputMinutes * 60);
  }, [inputMinutes]);

  useEffect(() => {
    let interval;

    if (isActive && duration > 0) {
      interval = setInterval(() => {
        setDuration((prevDuration) => prevDuration - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, duration]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputMinutes(inputValue);
  };

  const toggleTimer = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setDuration(inputMinutes * 60);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    } else {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Failed to enable fullscreen mode:", err);
      });
      setIsFullscreen(true);
    }
  };

  const hideFullscreen = () => {
    document.exitFullscreen();
    setIsFullscreen(false);
  };

  return (
    <Container>
      {isFullscreen ? (
        <FullscreenContainer>
          {formatTime(duration)}
          <Box display={"flex"} justifyContent={"center"}>
            <Paper sx={{ padding: 3, marginBottom: 3 }}>
              <ButtonContainer>
                <Button
                  variant="contained"
                  sx={{ color: "black" }}
                  onClick={toggleTimer}
                >
                  {isActive ? "Pause" : "Start"}
                </Button>
                <Button
                  variant="contained"
                  sx={{ color: "black" }}
                  onClick={resetTimer}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  sx={{ color: "black" }}
                  onClick={toggleFullscreen}
                >
                  Toggle Fullscreen
                </Button>
              </ButtonContainer>
            </Paper>
          </Box>
        </FullscreenContainer>
      ) : (
        <TimerContainer sx={{marginBottom: 3 }}>
          <Box sx={{fontSize: "12rem"}}>{formatTime(duration)}</Box>
          <Paper sx={{ padding: 3 }}>
            <TextField
              label="Set Minutes"
              type="number"
              value={inputMinutes}
              onChange={handleInputChange}
            />
            <ButtonContainer sx={{ marginTop: "20px" }}>
              <Button
                variant="contained"
                sx={{ color: "black" }}
                onClick={toggleTimer}
              >
                {isActive ? "Pause" : "Start"}
              </Button>
              <Button
                variant="contained"
                sx={{ color: "black" }}
                onClick={resetTimer}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                sx={{ color: "black" }}
                onClick={toggleFullscreen}
              >
                Toggle Fullscreen
              </Button>
            </ButtonContainer>
          </Paper>
        </TimerContainer>
      )}
    </Container>
  );
};

export default GameTimer;
