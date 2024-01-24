import React from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)({
  padding: '16px',
  color: 'white',
  backgroundColor: '#424242',
  marginBottom: '8px',
  position: 'relative',
});

const Connector = styled('div')(({ theme, isFinal }) => ({
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    border: `2px solid ${theme.palette.primary.main}`,
    width: '20px',
    right: '0',
  },
  '&::after': {
    top: isFinal ? '50%' : '100%',
    borderTop: '0',
  },
  [theme.breakpoints.down('md')]: {
    '&::before, &::after': {
      width: '10px',
    },
  },
}));

const Match = ({ match, isFinal = false }) => (
  <Box position="relative">
    <StyledPaper>
      <Typography variant="body2" color="white">{match.date}</Typography>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1" color="white">{match.player1}</Typography>
        <Typography variant="body1" color="white">{match.player2}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1" color="white">{match.score1}</Typography>
        <Typography variant="body1" color="white">{match.score2}</Typography>
      </Box>
    </StyledPaper>
    {!isFinal && <Connector />}
  </Box>
);

const Round = ({ matches, title, isFinalRound = false }) => (
  <Grid item xs>
    <Typography variant="h6" color="white" textAlign="center" marginBottom="16px">
      {title}
    </Typography>
    <Box display="flex" flexDirection="column" alignItems="center">
      {matches.map((match, index) => (
        <Match key={index} match={match} isFinal={isFinalRound && index === matches.length - 1} />
      ))}
    </Box>
  </Grid>
);

const TournamentBracket = () => {const rounds = [
  {
    title: 'Top 1',
    matches: [
      {
        date: '2021-07-27T23:00:00.000+00:00',
        player1: 'Alex',
        score1: '1',
        player2: 'BTC',
        score2: '0',
      },
      {
        date: '2021-07-27T23:00:00.000+00:00',
        player1: 'GlootOne',
        score1: 'W/O',
        player2: '',
        score2: '',
      },
      {
        date: '2021-07-27T23:00:00.000+00:00',
        player1: 'spacefudg3',
        score1: 'W/O',
        player2: '',
        score2: '',
      },
    ],
  },
  {
    title: 'Semi Top',
    matches: [
      {
        date: '2021-07-28T00:00:00.000+00:00',
        player1: 'Alex',
        score1: 'NS',
        player2: 'GlootOne',
        score2: 'NS',
      },
    ],
  },
  {
    title: 'Grand Top',
    matches: [
      {
        date: '2021-07-28T01:00:00.000+00:00',
        player1: 'spacefudg3',
        score1: '',
        player2: '',
        score2: '',
      },
    ],
  },
];


  return (
    <Box sx={{ flexGrow: 1, padding: 3, backgroundColor: '#212121' }}>
      <Typography variant="h4" color="white" gutterBottom textAlign="center">
        Tournament Bracket
      </Typography>
      <Grid container justifyContent="center">
        {rounds.map((round, index) => (
          <Round
            key={index}
            matches={round.matches}
            title={round.title}
            isFinalRound={index === rounds.length - 1}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default TournamentBracket;
