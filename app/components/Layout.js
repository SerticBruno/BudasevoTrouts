// components/Layout.js
import React from "react";
import { useTheme } from "@mui/material/styles";
import Footer from "./Footer";
import Navbar from "./Navbar";
// import Header from './Header'; // If you have a header component
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#d96200", // Replace with your desired primary color
    },
  },
  // ...other theme configuration options
});

const Layout = ({ children }) => {
  const theme = useTheme();
  return (
    <>
      <ThemeProvider theme={customTheme}>
        {/* <Header /> */}
        <Navbar />
        <main style={{ paddingTop: theme.mixins.toolbar.minHeight * 3 + "px" }}>
          {children}
        </main>
        <Footer />
      </ThemeProvider>
      <Analytics />
      <SpeedInsights />
    </>
  );
};

export default Layout;
