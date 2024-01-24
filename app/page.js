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
import MatchesList from "./components/Previews/MatchesList";
import SignupTimer from "./components/Timers/SignupTimer";
import DemoTimer from "./components/Timers/DemoTimer";
import MatchCountdownTimer from "./components/Timers/MatchCountdownTimer";
import PlayerList from "./components/Previews/PlayerList";
import MatchCreationForm from "./components/Forms/MatchCreationForm";
import PlayerStatsTable from "./components/Previews/PlayerStatsTable";
import { GamesProvider } from "./contexts/GamesContext";
import { PlayersProvider } from "./contexts/PlayersContext";
import Layout from "./components/Common/Layout";
import MartinovaKomponenta from "./components/MartinovFolder/MartinovaKomponenta";
import TournamentBracket from "./components/Testing/TournamentBracket";

export default function Home() {
  return (
    <Layout>
      <PlayersProvider>
        <GamesProvider>
          <ThemeProvider theme={theme}>
            <Box>
              <Container maxWidth="lg" sx={{ mt: 4 }}>
                {/* <Grid container spacing={3} mb={5}>
                  <Grid item xs={12} md={12}>
                    <DemoTimer></DemoTimer>
                  </Grid>
                </Grid> */}
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
                    <MatchesList></MatchesList>
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
              </Container>
            </Box>
          </ThemeProvider>
        </GamesProvider>
      </PlayersProvider>
    </Layout>
  );
}
