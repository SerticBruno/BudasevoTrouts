import React, { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  useScrollTrigger,
  Slide,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Hidden,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import BasketballIcon from "@mui/icons-material/SportsBasketball";
import BarChartIcon from '@mui/icons-material/BarChart';
import GamesIcon from '@mui/icons-material/Games';
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
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <HideOnScroll {...props}>
      <AppBar
        position="fixed"
        color="primary"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <img
              src="/pngs/budasevo-trouts-logo.png"
              alt="Logo"
              style={{
                marginRight: "15px",
                padding: 5,
                height: "80px", // Increase height for a larger logo
                borderRadius: "50px", // Rounded corners
                objectFit: "cover", // Ensures the image covers the area, adjust as needed
              }}
            />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Budaševo
            </Typography>
            <Hidden smDown>
              {/* Buttons for larger screens */}
              <Button
                color="inherit"
                startIcon={<BasketballIcon />}
                component={Link}
                href="/"
              >
                Home
              </Button>
              <Button
                color="inherit"
                startIcon={<BarChartIcon />}
                component={Link}
                href="/"
              >
                Statistics
              </Button>
              <Button
                color="inherit"
                startIcon={<GamesIcon />}
                component={Link}
                href="/martinov"
              >
                Martinov
              </Button>
            </Hidden>
            <Hidden smUp>
              {/* Menu icon for smaller screens */}
              <IconButton
                color="inherit"
                edge="start"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} component={Link} href="/">
                  Home
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  href="/"
                >
                  Statistics
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  href="/martinov"
                >
                  Martinov
                </MenuItem>
              </Menu>
            </Hidden>
          </Box>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar;
