// components/CourtPositionSelector.js

import React from 'react';
import { Box } from '@mui/material';

const CourtPositionMarker = ({ position, onClick }) => (
  <Box
    sx={{
      position: "absolute",
      top: `${position.top}%`,
      left: `${position.left}%`,
      width: 33,
      height: 33,
      border: '5px solid green',
      borderRadius: "50%",
      cursor: "pointer",
      transform: 'translate(-50%, -50%)', // Center the marker
    }}
    onClick={() => onClick(position.value)}
  />
);

const CourtPositionSelector = ({ imageSrc, onSelectPosition }) => {
  const positions = [
    { top: 38.5, left: 49.5, value: "1" },
    { top: 51.2, left: 20.6, value: "2" },
    { top: 83, left: 77.5, value: "3" },
    { top: 80, left: 30, value: "4" },
    { top: 67.7, left: 66.5, value: "5" },
    // Add more positions if needed
  ];

  return (
    <Box sx={{ 
      position: "relative", 
      display: 'flex', 
      justifyContent: 'center', // Center content horizontally
      width: "100%", 
      mt: 2, mb: 2 // Optional margin for spacing
    }}>
      <Box sx={{ position: "relative" }}>
        <img src={imageSrc} alt="Basketball Court" style={{ width: "100%", height: "auto" }} />
        {positions.map((position, index) => (
          <CourtPositionMarker key={index} position={position} onClick={onSelectPosition} />
        ))}
      </Box>
    </Box>
  );
};

export default CourtPositionSelector;
