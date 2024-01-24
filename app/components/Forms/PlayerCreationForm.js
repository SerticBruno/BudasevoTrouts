"use client";

import React, { useState, useContext, useRef } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Fade,
  Grid,
  Button,
  Paper,
} from "@mui/material";
import PlayersContext from "../../contexts/PlayersContext";
import CourtPositionSelector from "./FormComponents/CourtPositionSelector";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const PlayerCreationForm = ({ onPlayerCreate }) => {
  const { fetchPlayers } = useContext(PlayersContext);
  const [playerDetails, setPlayerDetails] = useState({
    name: "",
    position: "",
    score: 0,
  });
  const [errors, setErrors] = useState({ name: "", position: "", score: "" });

  const nameRef = useRef(null);
  const positionRef = useRef(null);
  const scoreRef = useRef(null);

  const [open, setOpen] = useState(false); // Modal open state

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const scrollToError = () => {
    if (errors.name) {
      nameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (errors.position) {
      positionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else if (errors.score) {
      scoreRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const validateForm = () => {
    let tempErrors = { name: "", position: "", score: "" };
    let isValid = true;

    if (!playerDetails.name) {
      tempErrors.name = "Player name is required";
      isValid = false;
    }

    if (playerDetails.position < 1 || playerDetails.position > 5) {
      tempErrors.position = "Player position must be between 1 and 5";
      isValid = false;
    }

    if (playerDetails.score < 1 || playerDetails.score > 10) {
      tempErrors.score = "Score must be between 1 and 10";
      isValid = false;
    }

    setErrors(tempErrors);

    if (!isValid) {
      scrollToError(); // Scroll to the error
    }

    return isValid;
  };

  const handleChange = (event) => {
    setPlayerDetails({
      ...playerDetails,
      [event.target.name]: event.target.value,
    });
    // Clear errors when user starts typing
    setErrors({ ...errors, [event.target.name]: "" });
  };

  const handlePositionSelect = (position) => {
    setPlayerDetails({ ...playerDetails, position });
    setErrors({ ...errors, position: "" }); // Clear position error
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return; // Stop the form submission if validation fails

    try {
      const response = await fetch("/api/players/create", {
        // Adjust the API endpoint as needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(playerDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to create player");
      }

      const data = await response.json();
      // onPlayerCreate(data); // Callback function to handle the newly created player
      await fetchPlayers(); // Re-fetch or update the context after successful creation
      setPlayerDetails({ name: "", position: "", score: 0 }); // Reset the form
      handleClose();
    } catch (error) {
      console.error("Error creating player:", error);
      // Handle errors here (e.g., show error message to the user)
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleOpen}
        sx={{
          fontSize: "1rem",
          fontWeight: "bold",
          padding: "10px 20px",
          textTransform: "none", // optional, for keeping the text's case
          marginBottom: "20px",
        }}
      >
        Add Player
      </Button>
      {/* Trigger button for modal */}
      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: "1200px",
              bgcolor: "background.paper",
              borderRadius: "8px",
              boxShadow: 24,
              p: 4,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxHeight: "80vh", // Add a maximum height to allow scrolling
              overflowY: "auto", // Enable vertical scrolling if the content exceeds the maximum height
            }}
          >
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="h4" color={"black"}>
                      Add new player
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Player Name"
                    name="name"
                    value={playerDetails.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    ref={nameRef} // Attach ref here
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Position"
                    name="position"
                    type="number"
                    value={playerDetails.position}
                    onChange={handleChange}
                    ref={positionRef} // Attach ref here
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={!!errors.position}
                    helperText={errors.position}
                    inputProps={{
                      min: 1,
                      max: 5,
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <CourtPositionSelector
                    imageSrc="/pngs/courtpositions.png"
                    onSelectPosition={handlePositionSelect}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Score"
                    name="score"
                    type="number"
                    value={playerDetails.score}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={!!errors.score}
                    helperText={errors.score}
                    inputProps={{
                      min: 1,
                      max: 10,
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    ref={scoreRef} // Attach ref here
                    fullWidth
                    sx={{
                      mt: 2,
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: "bold",
                      backgroundColor: "primary", // Adjust color as needed
                      color: "black", // Ensuring text is white for contrast
                      "&:hover": {
                        backgroundColor: "primary", // Darker on hover
                      },
                    }}
                  >
                    Add Player
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default PlayerCreationForm;
