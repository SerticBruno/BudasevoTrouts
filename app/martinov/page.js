"use client";

import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import Navbar from "../components/Common/Navbar"; // Adjust the import path based on your directory structure
import { Box } from "@mui/material";
import Layout from "../components/Common/Layout";
import MartinovaKomponenta from "../components/MartinovFolder/MartinovaKomponenta";
const Martinov = () => {
  return (
    <Layout>
      <MartinovaKomponenta></MartinovaKomponenta>
    </Layout>
  );
};

export default Martinov;
