import React, { useState } from "react";
import { Slider, Box, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function MartinovaKomponenta() {
  let min = 2.3;
  const [value, setValue] = useState(10);
  const [completed, setCompleted] = useState(false);

  const handleChange = (event, newValue) => {
    if (newValue < 10) {
      setValue(10);
      return;
    }

    if (newValue >= 90) {
      setValue(90);
    } else {
      setValue(newValue); // Update the value state
    }

    // Check if the slider has reached 90%
    if (newValue >= 90) {
      setCompleted(true);
      // You can trigger any action here, for example, completing a transaction

      setTimeout(() => {
        window.open("https://kekspay.hr/joinevent?eventcode=l37HwYEp1i");
      }, 500);

      // Reset the slider after a delay
      setTimeout(() => {
        setCompleted(false);
        setValue(10); // Reset the value to the start of the slider range
      }, 800);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 2,
      }}
    >
      <Typography variant="h3" gutterBottom mb={5}>
        Rijesi Soketu pare kralju
      </Typography>
      <Box sx={{ width: "80%", mb: 2 }}>
        <Slider
          value={value}
          aria-label="Rijesi soketu pare"
          valueLabelDisplay="off"
          step={1}
          min={0}
          max={100}
          onChange={handleChange}
          sx={{
            backgroundColor: "white",
            height: 20,
            borderRadius: 50,
            // Custom styles for the slider
            "& .MuiSlider-root": {
              color: "#52af77", // Changes the color of the thumb and track
            },
            "& .MuiSlider-thumb": {
              height: 44,
              width: 44,
              border: "2px solid currentColor",
              "&:hover, &.Mui-focusVisible": {
                boxShadow: "0px 0px 0px 8px rgba(0, 0, 0, 0.16)",
              },
              "& .Mui-active": {
                boxShadow: "0px 0px 0px 14px rgba(0, 0, 0, 0.16)",
              },
            },
            "& .MuiSlider-track": {
              height: 0,
              border: 0,
              backgroundColor: "green", // Color of the track
            },
            "& .MuiSlider-rail": {
              color: "#d8d8d8", // Color of the rail
              opacity: 0,
              height: 0,
              borderRadius: 0,
            },
          }}
        />
      </Box>
      {completed && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 2,
          }}
        >
          <CheckCircleOutlineIcon color="success" sx={{ fontSize: 40 }} />
        </Box>
      )}
    </Box>
  );
}
