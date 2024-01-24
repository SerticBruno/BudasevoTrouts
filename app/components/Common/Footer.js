// components/Footer.js
import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "#a34a00", // Set the background color to orange
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Add more grid items for additional sections */}
        </Grid>
        <Box mt={5}>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ fontWeight: "bold" }}
          >
            Made possible by You 💚 
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ fontWeight: "bold" }}
          >
            © {new Date().getFullYear()} Budasevo Trouts
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
