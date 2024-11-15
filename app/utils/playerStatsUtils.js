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

export const getMostCommonTeammateName = (players, mostCommonTeammateId) => {
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
  
  if (Object.keys(opponentCount).length === 0) {
    // No opponents found
    return null;
  }

  return Object.keys(opponentCount).reduce(
    (a, b) => (opponentCount[a] > opponentCount[b] ? a : b)
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

export const getMostCommonTeammateId = (matches, playerIdString) => {
  const teammateFrequency = {};

  matches.forEach((match) => {
    const team1Ids = Array.isArray(match.team1)
      ? match.team1.map((id) => id.toString())
      : [];
    const team2Ids = Array.isArray(match.team2)
      ? match.team2.map((id) => id.toString())
      : [];

    const playerInTeam1 = team1Ids.includes(playerIdString);
    const playerInTeam2 = team2Ids.includes(playerIdString);

    // Ensure teammatesIds is always an array
    const teammatesIds = playerInTeam1
      ? team1Ids
      : playerInTeam2
      ? team2Ids
      : [];

    teammatesIds.forEach((teammateId) => {
      if (teammateId !== playerIdString) {
        teammateFrequency[teammateId] =
          (teammateFrequency[teammateId] || 0) + 1;
      }
    });
  });

  return Object.keys(teammateFrequency).reduce((a, b) =>
    teammateFrequency[a] > teammateFrequency[b] ? a : b
  );
};

export const getBonusForStreak = (matches, playerIdString) => {
  let currentStreak = 0;
  let bonusPoints = 0;
  const pointsPerStreak = 2; // Bonus points for each streak of 3 or more wins
  const winStreakThreshold = 2; // Streak length to start earning bonus points

  matches.forEach((match) => {
    const team1Ids = match.team1.map((id) => id.toString());
    const team2Ids = match.team2.map((id) => id.toString());
    const playerInTeam1 = team1Ids.includes(playerIdString);
    const playerInTeam2 = team2Ids.includes(playerIdString);

    const team1Score = parseInt(match.team1Score, 10);
    const team2Score = parseInt(match.team2Score, 10);

    const playerTeamWon =
      (playerInTeam1 && team1Score > team2Score) ||
      (playerInTeam2 && team2Score > team1Score);

    if (playerTeamWon) {
      currentStreak++;
      if (currentStreak >= winStreakThreshold) {
        bonusPoints += pointsPerStreak;
      }
    } else {
      currentStreak = 0;
    }
  });

  return bonusPoints;
}

export const getLongestWinStreak = (matches, playerIdString) => {
  let currentStreak = 0;
  let longestStreak = 0;

  matches.forEach((match) => {
      const team1Ids = match.team1.map((id) => id.toString());
      const team2Ids = match.team2.map((id) => id.toString());
      const playerInTeam1 = team1Ids.includes(playerIdString);
      const playerInTeam2 = team2Ids.includes(playerIdString);

      const team1Score = parseInt(match.team1Score, 10);
      const team2Score = parseInt(match.team2Score, 10);

      const playerTeamWon =
          (playerInTeam1 && team1Score > team2Score) ||
          (playerInTeam2 && team2Score > team1Score);

      if (playerTeamWon) {
          currentStreak++;
          if (currentStreak > longestStreak) {
              longestStreak = currentStreak;
          }
      } else {
          currentStreak = 0;
      }
  });

  return longestStreak;
};


export const getLongestLoseStreak = (matches, playerIdString) => {
  let currentStreak = 0;
  let longestStreak = 0;

  matches.forEach((match) => {
      const team1Ids = match.team1.map((id) => id.toString());
      const team2Ids = match.team2.map((id) => id.toString());
      const playerInTeam1 = team1Ids.includes(playerIdString);
      const playerInTeam2 = team2Ids.includes(playerIdString);

      const team1Score = parseInt(match.team1Score, 10);
      const team2Score = parseInt(match.team2Score, 10);

      const playerTeamLost =
          (playerInTeam1 && team1Score < team2Score) ||
          (playerInTeam2 && team2Score < team1Score);

      if (playerTeamLost) {
          currentStreak++;
          if (currentStreak > longestStreak) {
              longestStreak = currentStreak;
          }
      } else {
          currentStreak = 0;
      }
  });

  return longestStreak;
};