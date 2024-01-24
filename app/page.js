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
  const currentTime = new Date();
  const showHiddenElements =
    currentTime.getHours() >= 19 && currentTime.getMinutes() >= 30;

  return (
    <Layout>
      <PlayersProvider>
        <GamesProvider>
          <ThemeProvider theme={theme}>
            <Box>
              {!showHiddenElements && (
              <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Grid container spacing={3} mb={5}>
                  <Grid item xs={12} md={12}>
                    <DemoTimer></DemoTimer>
                  </Grid>
                </Grid>
              </Container>
              )}

              {/* everything after this line should hidden  */}
              {/* these elemtns should be hidden  */}

              {showHiddenElements && (
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

                  {/* these elemtns should be hidden  */}
                </Container>
              )}
            </Box>
          </ThemeProvider>
        </GamesProvider>
      </PlayersProvider>
    </Layout>
  );
}
