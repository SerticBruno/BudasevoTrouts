import { connectToDatabase } from "../../../app/lib/mongodb";
import { ObjectId } from "mongodb"; // Import ObjectId for conversion
import {
  calculateGamesDraw,
  calculateGamesLost,
  calculateGamesPlayed,
  calculateGamesWon,
  calculateWinRatio,
  getMostCommonOpponentName,
  getMostCommonOpponentId,
  calculateGamesPlayedAgainsMostCommonOpponent,
} from "../../../app/utils/playerStatsUtils";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Only GET requests allowed" });
    return;
  }

  try {
    const { db } = await connectToDatabase();
    const players = await db.collection("players").find({}).toArray();
    const matches = await db.collection("matches").find({}).toArray();

    const playerStats = players.map((player) => {
      const playerIdString = player._id.toString(); // Convert player ObjectId to string

      const gamesPlayed = calculateGamesPlayed(matches, playerIdString);
      const gamesWon = calculateGamesWon(matches, playerIdString);

      const gamesLost = calculateGamesLost(matches, playerIdString);

      const gamesDraw = calculateGamesDraw(matches, playerIdString);

      const winRatio = calculateWinRatio(gamesWon, gamesPlayed);
      const matchAttendance = calculateMatchAttendance(
        gamesPlayed,
        matches.length
      );

      const mostCommonOpponentId = getMostCommonOpponentId(
        matches,
        playerIdString
      );

      const mostCommonOpponentName = getMostCommonOpponentName(
        players,
        mostCommonOpponentId
      );

      const gamesAgainstMostCommonOpponent =
        calculateGamesPlayedAgainsMostCommonOpponent(
          matches,
          playerIdString,
          mostCommonOpponentId
        );

      let gamesPlayedAgainstMostCommon =
        gamesAgainstMostCommonOpponent.gamesPlayedAgainstMostCommon;
      let winsAgainstMostCommon =
        gamesAgainstMostCommonOpponent.winsAgainstMostCommon;
      let lossesAgainstMostCommon =
        gamesAgainstMostCommonOpponent.lossesAgainstMostCommon;
      let drawsAgainstMostCommon =
        gamesAgainstMostCommonOpponent.drawsAgainstMostCommon;

      let gamesPlayedWithMostCommonTeammate = 0;
      let winsWithMostCommonTeammate = 0;
      let lossesWithMostCommonTeammate = 0;
      let drawsWithMostCommonTeammate = 0;

      // Step 1: Identify the Most Common Teammate
      const teammateFrequency = {};

      matches.forEach((match) => {
        const team1Ids = Array.isArray(match.team1)
          ? match.team1.map((id) => id.toString())
          : [];
        const team2Ids = Array.isArray(match.team2)
          ? match.team2.map((id) => id.toString())
          : [];

        const playerInTeam1 = team1Ids.includes(player._id.toString());
        const playerInTeam2 = team2Ids.includes(player._id.toString());

        // Ensure teammatesIds is always an array
        const teammatesIds = playerInTeam1
          ? team1Ids
          : playerInTeam2
          ? team2Ids
          : [];

        teammatesIds.forEach((teammateId) => {
          if (teammateId !== player._id.toString()) {
            teammateFrequency[teammateId] =
              (teammateFrequency[teammateId] || 0) + 1;
          }
        });
      });

      const mostCommonTeammateId = Object.keys(teammateFrequency).reduce(
        (a, b) => (teammateFrequency[a] > teammateFrequency[b] ? a : b)
      );

      // Step 2: Calculate Wins, Losses, and Draws With That Teammate
      matches.forEach((match) => {
        const team1Ids = Array.isArray(match.team1)
          ? match.team1.map((id) => id.toString())
          : [];
        const team2Ids = Array.isArray(match.team2)
          ? match.team2.map((id) => id.toString())
          : [];

        const playerInTeam1 = team1Ids.includes(player._id.toString());
        const playerInTeam2 = team2Ids.includes(player._id.toString());
        const teammateInSameTeam =
          (playerInTeam1 && team1Ids.includes(mostCommonTeammateId)) ||
          (playerInTeam2 && team2Ids.includes(mostCommonTeammateId));

        if (teammateInSameTeam) {
          gamesPlayedWithMostCommonTeammate++;

          const team1Score = parseInt(match.team1Score, 10);
          const team2Score = parseInt(match.team2Score, 10);

          if (team1Score === team2Score) {
            drawsWithMostCommonTeammate++;
          } else if (
            (playerInTeam1 && team1Score > team2Score) ||
            (playerInTeam2 && team2Score > team1Score)
          ) {
            winsWithMostCommonTeammate++;
          } else {
            lossesWithMostCommonTeammate++;
          }
        }
      });

      function getMostCommonTeammateName(players, mostCommonTeammateId) {
        return players.find((p) => p._id.toString() === mostCommonTeammateId)
          ?.name;
      }

      // Usage of the function
      const mostCommonTeammateName = getMostCommonTeammateName(
        players,
        mostCommonTeammateId
      );

      let teammateWinCount = {};
      let teammateLossCount = {};
      let teammateDrawCount = {};

      matches.forEach((match) => {
        const team1Ids = match.team1.map((id) => id.toString());
        const team2Ids = match.team2.map((id) => id.toString());
        const playerInTeam1 = team1Ids.includes(player._id.toString());
        const playerInTeam2 = team2Ids.includes(player._id.toString());

        const teammatesIds = playerInTeam1 ? team1Ids : team2Ids;
        const team1Score = parseInt(match.team1Score, 10);
        const team2Score = parseInt(match.team2Score, 10);

        const playerTeamWon =
          (playerInTeam1 && team1Score > team2Score) ||
          (playerInTeam2 && team2Score > team1Score);
        const playerTeamLost =
          (playerInTeam1 && team1Score < team2Score) ||
          (playerInTeam2 && team2Score < team1Score);
        const matchDrawn = team1Score === team2Score;

        teammatesIds.forEach((teammateId) => {
          if (teammateId !== player._id.toString()) {
            if (playerTeamWon) {
              teammateWinCount[teammateId] =
                (teammateWinCount[teammateId] || 0) + 1;
            } else if (playerTeamLost) {
              teammateLossCount[teammateId] =
                (teammateLossCount[teammateId] || 0) + 1;
            } else if (matchDrawn) {
              teammateDrawCount[teammateId] =
                (teammateDrawCount[teammateId] || 0) + 1;
            }
          }
        });
      });

      // Find the teammate with the most wins
      let maxWins = 0;
      let teammateWithMostWinsId = "";
      for (const [teammateId, wins] of Object.entries(teammateWinCount)) {
        if (wins > maxWins) {
          maxWins = wins;
          teammateWithMostWinsId = teammateId;
        }
      }

      // Get the number of losses and draws with that teammate
      const lossesWithTeammateWithMostWins =
        teammateLossCount[teammateWithMostWinsId] || 0;
      const drawsWithTeammateWithMostWins =
        teammateDrawCount[teammateWithMostWinsId] || 0;

      // Assuming you have a way to get player names from their IDs
      const teammateWithMostWinsName = players.find(
        (p) => p._id.toString() === teammateWithMostWinsId
      )?.name;

      let maxLosses = 0;
      let teammateWithMostLossesId = "";
      for (const [teammateId, losses] of Object.entries(teammateLossCount)) {
        if (losses > maxLosses) {
          maxLosses = losses;
          teammateWithMostLossesId = teammateId;
        }
      }
      // Get the name of the teammate with the most losses
      const teammateWithMostLossesName = getMostCommonTeammateName(
        players,
        teammateWithMostLossesId
      );

      const teammateWithMostLossesWinsCount =
        teammateWinCount[teammateWithMostLossesId] || 0;
      const teammateWithMostLossesDrawsCount =
        teammateDrawCount[teammateWithMostLossesId] || 0;

      let matchScore = gamesWon * 12 + gamesLost * 3 + gamesDraw * 6;

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

      matchScore += bonusPoints;

      return {
        ...player,
        matchScore,
        gamesPlayed,
        gamesWon,
        gamesLost,
        gamesDraw,
        totalMatches: matches.length,
        matchAttendance,
        mostCommonOpponent: mostCommonOpponentName,
        gamesPlayedAgainstMostCommon,
        winsAgainstMostCommon,
        drawsAgainstMostCommon,
        lossesAgainstMostCommon,
        winRatio,
        mostCommonTeammateName,
        gamesPlayedWithMostCommonTeammate,
        winsWithMostCommonTeammate,
        lossesWithMostCommonTeammate,
        drawsWithMostCommonTeammate,
        teammateWithMostWinsName,
        teammateWithMostWinsCount: maxWins,
        teammateWithMostWinsLossesCount: lossesWithTeammateWithMostWins,
        drawsWithTeammateWithMostWins,
        teammateWithMostLossesName,
        teammateWithMostLossesCount: maxLosses,
        teammateWithMostLossesWinsCount,
        teammateWithMostLossesDrawsCount,
      };
    });

    res.status(200).json(playerStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
