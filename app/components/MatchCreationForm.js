// ParentComponent.js
import React, { useState } from "react";
import { Button } from "@mui/material";
import MatchCreationModal from "./MatchCreationModal";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const MatchCreationForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleOpenModal}
        sx={{
          fontSize: "1rem",
          fontWeight: "bold",
          padding: "10px 20px",
          textTransform: "none", // optional, for keeping the text's case
          marginBottom: "20px",
          backgroundColor: "#ff5722",
        }}
      >
        Create match
      </Button>
      <MatchCreationModal open={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default MatchCreationForm;
