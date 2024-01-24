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
import SignupTimer from "./components/Timers/SignupTimer";
import DemoTimer from "./components/Timers/DemoTimer";
import MatchCountdownTimer from "./components/Timers/MatchCountdownTimer";
import PlayerList from "./components/PlayerList";
import MatchCreationForm from "./components/MatchCreationForm";
import PlayerStatsTable from "./components/PlayerStatsTable";
import { GamesProvider } from "./contexts/GamesContext";
import { PlayersProvider } from "./contexts/PlayersContext";
import Layout from "./components/Layout";
import MartinovaKomponenta from "./components/MartinovaKomponenta";
import TournamentBracket from "./components/TournamentBracket";

export default function Home() {
  return (
    <Layout>
      <PlayersProvider>
        <GamesProvider>
          <ThemeProvider theme={theme}>
            <Box>
              <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Grid container spacing={3} mb={5}>
                  <Grid item xs={12} md={12}>
                    <DemoTimer></DemoTimer>
                  </Grid>
                </Grid>
                <Grid container spacing={3} mb={5}>
                  <Grid item xs={12} md={12}>
                    <SignupTimer></SignupTimer>
                  </Grid>
                </Grid>
                <Grid container spacing={3} mb={5}>
                  <Grid item xs={12} md={12}>
                    <MatchCountdownTimer></MatchCountdownTimer>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12}>
                    {/* <TournamentBracket></TournamentBracket> */}
                  </Grid>
                </Grid>
              </Container>

              <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <GamesList></GamesList>
                  </Grid>
                </Grid>

                <Grid container spacing={3} sx={{ mt: 4 }}>
                  <Grid item xs={12} md={12}>
                    <PlayerList></PlayerList>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <PlayerStatsTable />
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                  {/* <Grid item xs={12} md={6}>
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
                  </Grid> */}
                  {/* <Grid item xs={12} md={6} >
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
                          Team Rando
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid> */}
                </Grid>
              </Container>
            </Box>
          </ThemeProvider>
        </GamesProvider>
      </PlayersProvider>
    </Layout>
  );
}
