"use client";

import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import Navbar from "../components/Common/Navbar"; // Adjust the import path based on your directory structure
import { Box } from "@mui/material";
import Layout from "../components/Common/Layout";
import MartinovaKomponenta from "../components/MartinovFolder/MartinovaKomponenta";
import GameTimer from "../components/Timers/GameTimer";
const Martinov = () => {
  return (
    <Layout>
      <MartinovaKomponenta></MartinovaKomponenta>
      <Box display={"flex"} justifyContent={"center"}>

      <GameTimer initialDuration={35} ></GameTimer>
      </Box>
    </Layout>
  );
};

export default Martinov;
