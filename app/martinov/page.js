"use client";

import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import Navbar from "../components/Navbar"; // Adjust the import path based on your directory structure
import { Box } from "@mui/material";
import Layout from "../components/Layout";
import MartinovaKomponenta from "../components/MartinovaKomponenta";
const Martinov = () => {
  return (
    <Layout>
      <MartinovaKomponenta></MartinovaKomponenta>
    </Layout>
  );
};

export default Martinov;
