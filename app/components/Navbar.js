import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  useScrollTrigger,
  Slide,
  Box,
  Stack,
} from "@mui/material";
import BasketballIcon from "@mui/icons-material/SportsBasketball";  
import React from "react";

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    threshold: 100,
    target: props.window ? window() : undefined,
  });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = (props) => {
  return (
    <HideOnScroll {...props}>
      <AppBar
        position="fixed"
        color="primary"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img src="/pngs/budasevo-trouts-logo.png" alt="Logo" style={{ marginRight: '15px', height: '50px' }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
            Basketball Community Tournament
          </Typography>
          <Button color="inherit" startIcon={<BasketballIcon />} component={Link} href="/">Home</Button>
          <Button color="inherit" startIcon={<BasketballIcon />} component={Link} href="/statistics">Statistics</Button>
          <Button color="inherit" startIcon={<BasketballIcon />} component={Link} href="/matches">Matches</Button>
          {/* User Icon/Button here if needed */}
        </Box>
      </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar;
