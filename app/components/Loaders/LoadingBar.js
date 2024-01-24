// components/Footer.js
import * as React from "react";
import { Box, CircularProgress } from "@mui/material";

const LoadingBar = () => {
  return (
    <Box
      sx={{
        height: "150px", // Set the height of the Box
        display: "flex", // Enable Flexbox
        justifyContent: "center", // Center content horizontally
        alignItems: "center", // Center content vertically
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingBar;
