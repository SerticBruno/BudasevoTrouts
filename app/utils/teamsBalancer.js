import { calculateGamesWon } from "../../app/utils/playerStatsUtils";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

// match details, selectedPlayers
export const assignTeamsBalanced = (games, selectedPlayers, players) => {
  let playersByPosition = { 1: [], 2: [], 3: [], 4: [], 5: [] };

  selectedPlayers.forEach((playerId) => {
    const player = players.find((p) => p._id === playerId);
    if (player && playersByPosition.hasOwnProperty(player.position)) {
      let playerMatchScore = calculateGamesWon(games, player._id.toString()); // calculate the match score
      playersByPosition[player.position].push({
        id: playerId,
        score: playerMatchScore,
      });
    }
  });

  let team1 = [],
    team2 = [];

  Object.keys(playersByPosition).forEach((position) => {
    let positionPlayers = playersByPosition[position];

    // Sort players by match score within each position
    positionPlayers.forEach((player) => {
      player.score += Math.random() - 0.5; // Adjust the factor to control randomness
    });

    positionPlayers.sort((a, b) => b.score - a.score);

    // Distribute players to balance match score
    positionPlayers.forEach((player, index) => {
      if (index % 2 === 0) {
        team1.push(player.id);
      } else {
        team2.push(player.id);
      }
    });
  });

  // If teams are uneven, move a player from the larger team to the smaller team
  if (team1.length !== team2.length) {
    let [largerTeam, smallerTeam] =
      team1.length > team2.length ? [team1, team2] : [team2, team1];
    let moved = false;

    // Try to move a player while maintaining position balance
    for (let position = 1; position <= 5 && !moved; position++) {
      let playerToMove = largerTeam.find((playerId) => {
        return (
          players.find((p) => p._id === playerId).position == position &&
          smallerTeam.every(
            (pId) => players.find((p) => p._id === pId).position !== position
          )
        );
      });

      if (playerToMove) {
        largerTeam = largerTeam.filter((pId) => pId !== playerToMove);
        smallerTeam.push(playerToMove);
        moved = true;
      }
    }

    // Update the teams only if a player was moved
    if (moved) {
      if (team1.length > team2.length) {
        [team1, team2] = [largerTeam, smallerTeam];
      } else {
        [team2, team1] = [largerTeam, smallerTeam];
      }
    }
  }

  if (team1.length >= 1 && team2.length >= 1) {
    return { team1, team2 };
  } else {
    return { team1: [], team2: [] };
  }
};
