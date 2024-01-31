// GameTimer.js

import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, Button, Paper } from "@mui/material";
import { styled } from "@mui/system";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh", // Set the height of the container to fill the viewport
});

const FullscreenContainer = styled("div")({
  fontSize: "50rem",
  textAlign: "center",
  fontFamily: "monospace",
  minHeight: "120vh",
  marginTop: "0px", // Adjusted marginTop to center vertically
});

const TimerContainer = styled("div")({
  fontSize: "1rem",
  textAlign: "center",
  fontFamily: "monospace",
});

const ButtonContainer = styled("div")({
  display: "flex",
  flexDirection: "column", // Change to column layout
  gap: "10px",
});

const GameTimer = ({ initialMinutes, initialSeconds }) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  const [isActive, setIsActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    let interval;

    if (isActive && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  // useEffect(() => {
  //   if (isFullscreen && timerRef.current) {
  //     timerRef.current.scrollIntoView({
  //       behavior: "smooth",
  //       block: "center",
  //       inline: "center",
  //     });
  //   }
  // }, [isFullscreen]);

  // useEffect(() => {
  //   if (isFullscreen) {
  //     document.body.style.overflow = "hidden"; // Hide scrollbar
  //   } else {
  //     document.body.style.overflow = "auto"; // Show scrollbar
  //   }
  // }, [isFullscreen]);

  const toggleTimer = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
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

  const handleTimerDoubleClick = () => {
    toggleFullscreen();
  };

  return (
    <Container >
      {isFullscreen ? (
        <FullscreenContainer>
          <Box
            ref={timerRef}
            onClick={toggleTimer}
            onDoubleClick={handleTimerDoubleClick} // Toggle fullscreen on double click
            marginBottom={"25rem"}
            sx={{ color: "red" }}
          >
            {`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
              2,
              "0"
            )}`}
          </Box>
          <Paper sx={{ padding: 3, marginBottom: 3 }}>
            <ButtonContainer>
              <Button
                variant="contained"
                sx={{ color: "black" }}
                onClick={resetTimer}
              >
                Reset
              </Button>
            </ButtonContainer>
          </Paper>
        </FullscreenContainer>
      ) : (
        <TimerContainer
          // Toggle fullscreen on double click
          onClick={toggleTimer}
          onDoubleClick={handleTimerDoubleClick}
        >
          <Box sx={{ fontSize: "12rem", marginBottom: "5rem", color: "red" }}>{`${String(
            minutes
          ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}</Box>
          <Paper sx={{ padding: 3, marginTop: "20px" }}>
            <Box>
              <TextField
                label="Minutes"
                type="number"
                value={minutes}
                onClick={toggleTimer}
                onDoubleClick={handleTimerDoubleClick}
                cursor={"pointer"}
                onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
              />
              <TextField
                label="Seconds"
                type="number"
                value={seconds}
                onClick={toggleTimer}
                onDoubleClick={handleTimerDoubleClick}
                cursor={"pointer"}
                onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
              />
            </Box>
            <ButtonContainer>
              <Button
                variant="contained"
                sx={{ color: "black" }}
                onClick={resetTimer}
              >
                Reset
              </Button>
            </ButtonContainer>
          </Paper>
        </TimerContainer>
      )}
    </Container>
  );
};

export default GameTimer;
