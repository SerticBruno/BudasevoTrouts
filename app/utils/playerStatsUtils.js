export const calculateGamesPlayed = (matches, playerIdString) => {
  return matches.filter(
    (match) =>
      match.team1.map((id) => id.toString()).includes(playerIdString) ||
      match.team2.map((id) => id.toString()).includes(playerIdString)
  ).length;
};

export const calculateGamesWon = (matches, playerIdString) => {
  return matches.filter((match) => {
    const team1Score = parseInt(match.team1Score, 10);
    const team2Score = parseInt(match.team2Score, 10);

    const isPlayerInTeam1 = match.team1
      .map((id) => id.toString())
      .includes(playerIdString);
    const isPlayerInTeam2 = match.team2
      .map((id) => id.toString())
      .includes(playerIdString);

    return (
      (isPlayerInTeam1 && team1Score > team2Score) ||
      (isPlayerInTeam2 && team2Score > team1Score)
    );
  }).length;
};

export const calculateGamesLost = (matches, playerIdString) => {
  return matches.filter((match) => {
    const team1Score = parseInt(match.team1Score, 10);
    const team2Score = parseInt(match.team2Score, 10);

    const isPlayerInTeam1 = match.team1
      .map((id) => id.toString())
      .includes(playerIdString);
    const isPlayerInTeam2 = match.team2
      .map((id) => id.toString())
      .includes(playerIdString);

    return (
      (isPlayerInTeam1 && team1Score < team2Score) ||
      (isPlayerInTeam2 && team2Score < team1Score)
    );
  }).length;
};

export const calculateGamesDraw = (matches, playerIdString) => {
  return matches.filter((match) => {
    const team1Score = parseInt(match.team1Score, 10);
    const team2Score = parseInt(match.team2Score, 10);

    const isPlayerInTeam1 = match.team1
      .map((id) => id.toString())
      .includes(playerIdString);
    const isPlayerInTeam2 = match.team2
      .map((id) => id.toString())
      .includes(playerIdString);

    return (
      (isPlayerInTeam1 && team1Score == team2Score) ||
      (isPlayerInTeam2 && team2Score == team1Score)
    );
  }).length;
};

export const calculateWinRatio = (gamesWon, gamesPlayed) => {
  return ((gamesWon / gamesPlayed) * 100).toFixed(2);
};

export const calculateMatchAttendance = (gamesPlayed, totalGames) => {
  return ((gamesPlayed / totalGames) * 100).toFixed(2);
};

export const getMostCommonOpponentName = (players, mostCommonOpponentId) => {
  const player = getPlayerById(players, mostCommonOpponentId);
  return player ? player.name : null; // Return the player's name or null if not found
};

export const getPlayerById = (players, playerIdString) => {
  return players.find((p) => p._id.toString() === playerIdString);
};

export const getMostCommonOpponentId = (matches, playerIdString) => {
  let opponentCount = {}; // Object to keep track of the number of times each opponent is faced

  matches.forEach((match) => {
    // Skip if the match is a draw
    if (match.team1Score === match.team2Score) return;

    let opponentTeam = match.team1
      .map((id) => id.toString())
      .includes(playerIdString)
      ? match.team2
      : match.team1;
    opponentTeam.forEach((opponentId) => {
      let opponentIdStr = opponentId.toString(); // Convert ObjectId to string
      opponentCount[opponentIdStr] = (opponentCount[opponentIdStr] || 0) + 1;
    });
  });

  return Object.keys(opponentCount).reduce(
    (a, b) => (opponentCount[a] > opponentCount[b] ? a : b),
    null
  );
};

export const calculateGamesPlayedAgainsMostCommonOpponent = (
  matches,
  playerIdString,
  mostCommonOpponentId
) => {
  let gamesPlayedAgainstMostCommon = 0;
  let winsAgainstMostCommon = 0;
  let lossesAgainstMostCommon = 0;
  let drawsAgainstMostCommon = 0;

  matches.forEach((match) => {
    const team1Ids = match.team1.map((id) => id.toString());
    const team2Ids = match.team2.map((id) => id.toString());
    const playerInTeam1 = team1Ids.includes(playerIdString);
    const playerInTeam2 = team2Ids.includes(playerIdString);
    const opponentId = playerInTeam1 ? team2Ids : team1Ids;

    if (opponentId.includes(mostCommonOpponentId)) {
      gamesPlayedAgainstMostCommon++;

      const team1Score = parseInt(match.team1Score, 10);
      const team2Score = parseInt(match.team2Score, 10);

      if (team1Score === team2Score) {
        drawsAgainstMostCommon++;
      } else if (
        (playerInTeam1 && team1Score > team2Score) ||
        (playerInTeam2 && team2Score > team1Score)
      ) {
        winsAgainstMostCommon++;
      } else {
        lossesAgainstMostCommon++;
      }
    }
  });

  return {
    gamesPlayedAgainstMostCommon,
    winsAgainstMostCommon,
    lossesAgainstMostCommon,
    drawsAgainstMostCommon,
  };
};