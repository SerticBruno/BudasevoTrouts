// match details, selectedPlayers
export const assignTeamsBalanced = (
  selectedPlayers,
  players,
) => {
  let playersByPosition = { 1: [], 2: [], 3: [], 4: [], 5: [] };

  // Group players by position
  selectedPlayers.forEach((playerId) => {
    const player = players.find((p) => p._id === playerId);
    if (player && playersByPosition.hasOwnProperty(player.position)) {
      playersByPosition[player.position].push(playerId);
    }
  });

  let team1 = [],
    team2 = [];
  Object.keys(playersByPosition).forEach((position) => {
    let positionPlayers = playersByPosition[position];
    positionPlayers.sort(() => Math.random() - 0.5);

    // Distribute players to teams, with extra player going to the smaller team
    positionPlayers.forEach((playerId, index) => {
      if (
        index % 2 === 0 ||
        (index === positionPlayers.length - 1 && team1.length > team2.length)
      ) {
        team2.push(playerId);
      } else {
        team1.push(playerId);
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
