import { connectToDatabase } from '../../../app/lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Only POST requests allowed' });
    return;
  }

  try {
    const { db } = await connectToDatabase();
    const playerData = req.body;
    const result = await db.collection('players').insertOne(playerData);

    if (!result.acknowledged) {
      throw new Error('Player creation failed');
    }

    // Create an object to send back, including the inserted ID and the player data
    const insertedPlayer = { _id: result.insertedId, ...playerData };
    res.status(201).json({ message: 'Player created', player: insertedPlayer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
