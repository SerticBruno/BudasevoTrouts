"use client";

import * as React from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Paper,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "./themes/light";
import GamesList from "./components/GamesList";
import CountdownTimer from "./components/CountdownTimer";
import MatchCountdownTimer from "./components/MatchCountdownTimer";
import PlayerList from "./components/PlayerList";
import MatchCreationForm from "./components/MatchCreationForm";
import PlayerStatsTable from "./components/PlayerStatsTable";
import PlayerCreationForm from "./components/PlayerCreationForm";
import { GamesProvider } from "./contexts/GamesContext";
import { PlayersProvider } from "./contexts/PlayersContext";
import Layout from "./components/Layout";

export default function Home() {
  return (
    <Layout>
      <PlayersProvider>
        <GamesProvider>
          <ThemeProvider theme={theme}>
            <Box>

              <Container sx={{ mt: 4 }}>
                <CountdownTimer></CountdownTimer>
              </Container>
              <Container sx={{ mt: 4 }}>
                <MatchCountdownTimer></MatchCountdownTimer>
              </Container>

              <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <GamesList></GamesList>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <MatchCreationForm></MatchCreationForm>
                  </Grid>
                </Grid>

                <Grid container spacing={3} sx={{ mt: 4 }}>
                  <Grid item xs={12} md={12}>
                    <PlayerList></PlayerList>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <PlayerCreationForm></PlayerCreationForm>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <PlayerStatsTable />
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ height: "100%" }}>
                      <CardMedia
                        component="img"
                        sx={{
                          width: "100%", // Full width of the card
                          height: 300, // Height adjusts to maintain the image's aspect ratio
                        }}
                        image="/jpgs/court.jpg"
                        alt="Basketball Court"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Create a Match
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Explore upcoming basketball matches and join the one
                          that fits your schedule.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ height: "100%" }}>
                      <CardMedia
                        component="img"
                        sx={{
                          width: "100%", // Full width of the card
                          height: 300, // Height adjusts to maintain the image's aspect ratio
                        }}
                        image="/pngs/team.png"
                        alt="Basketball Team"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Team Randomizer
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Let us create balanced teams for your next game with
                          our team randomizer.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  {/* Additional grid items/cards can be added here */}
                </Grid>
              </Container>
            </Box>
          </ThemeProvider>
        </GamesProvider>
      </PlayersProvider>
    </Layout>
  );
}
