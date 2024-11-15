'use client'

import React, { useState } from 'react';
import { Box } from '@mui/material';

const CourtPositionMarker = ({ position, onClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    onClick(position.value);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 150); // Revert after 300ms
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: `${position.top}%`,
        left: `${position.left}%`,
        width: {
          xs: isClicked ? 66 : 33,  // Width for extra-small devices (mobile)
          sm: isClicked ? 100 : 44,   // Width for small devices (tablet)
          md: isClicked ? 110 : 55,   // Width for medium devices and up (optional, can be adjusted or removed)
        },
        height: {
          xs: isClicked ? 66 : 33,  // Width for extra-small devices (mobile)
          sm: isClicked ? 100 : 44,   // Width for small devices (tablet)
          md: isClicked ? 110 : 55,   // Width for medium devices and up (optional, can be adjusted or removed)
        },
        border: '3px solid white',
        backgroundColor: isClicked ? 'white' : 'transparent', // Flash red on click
        borderRadius: "50%",
        cursor: "pointer",
        transform: 'translate(-50%, -50%)',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'green',
        },
      }}
      onClick={handleClick}
    />
  );
};

const CourtPositionSelector = ({ imageSrc, onSelectPosition }) => {
  const positions = [
    { top: 33, left: 50.5, value: "1" },
    { top: 46.5, left: 25.6, value: "2" },
    { top: 73, left: 68.5, value: "3" },
    { top: 73, left: 33, value: "4" },
    { top: 56.5, left: 64, value: "5" },
    // Add more positions if needed
  ];

  return (
    <Box sx={{ 
      position: "relative", 
      display: 'flex', 
      justifyContent: 'center',
      width: {
        xs: "100%",  // Width for extra-small devices (mobile)
        sm: "60%",   // Width for small devices (tablet)
        md: "40%",   // Width for medium devices and up (optional, can be adjusted or removed)
      },
      mt: 2, mb: 2
    }}>
      <Box sx={{ position: "relative", width: "100%" }}>
        <img src={imageSrc} alt="Basketball Court" style={{ width: "100%", height: "auto" }} />
        {positions.map((position, index) => (
          <CourtPositionMarker key={index} position={position} onClick={onSelectPosition} />
        ))}
      </Box>
    </Box>
  );

};

export default CourtPositionSelector;
