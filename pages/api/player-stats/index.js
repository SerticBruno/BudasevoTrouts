import { connectToDatabase } from "../../../app/lib/mongodb";
import { ObjectId } from "mongodb"; // Import ObjectId for conversion

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

      const gamesPlayed = matches.filter(
        (match) =>
          match.team1.map((id) => id.toString()).includes(playerIdString) ||
          match.team2.map((id) => id.toString()).includes(playerIdString)
      ).length;

      const gamesWon = matches.filter((match) => {
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

      const gamesLost = matches.filter((match) => {
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

      const gamesDraw = matches.filter((match) => {
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

      const winRatio = ((gamesWon / gamesPlayed) * 100).toFixed(2);
      const matchAttendance = ((gamesPlayed / matches.length) * 100).toFixed(2);

      let opponentCount = {}; // Object to keep track of the number of times each opponent is faced

      matches.forEach((match) => {
        // Skip if the match is a draw
        if (match.team1Score === match.team2Score) return;

        let opponentTeam = match.team1
          .map((id) => id.toString())
          .includes(player._id.toString())
          ? match.team2
          : match.team1;
        opponentTeam.forEach((opponentId) => {
          let opponentIdStr = opponentId.toString(); // Convert ObjectId to string
          opponentCount[opponentIdStr] =
            (opponentCount[opponentIdStr] || 0) + 1;
        });
      });

      // Find the most common opponent ID
      let mostCommonOpponentId = Object.keys(opponentCount).reduce(
        (a, b) => (opponentCount[a] > opponentCount[b] ? a : b),
        null
      );

      // Find the most common opponent's name
      const mostCommonOpponentName = players.find(
        (p) => p._id.toString() === mostCommonOpponentId
      )?.name;

      let gamesPlayedAgainstMostCommon = 0;
      let winsAgainstMostCommon = 0;
      let lossesAgainstMostCommon = 0;
      let drawsAgainstMostCommon = 0;

      matches.forEach((match) => {
        const team1Ids = match.team1.map((id) => id.toString());
        const team2Ids = match.team2.map((id) => id.toString());
        const playerInTeam1 = team1Ids.includes(player._id.toString());
        const playerInTeam2 = team2Ids.includes(player._id.toString());
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
        ...player,
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
      };
    });

    res.status(200).json(playerStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
