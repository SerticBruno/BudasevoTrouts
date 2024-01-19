import { connectToDatabase } from '../../../app/lib/mongodb'; // Adjust the path to your mongodb connection utility

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Only GET requests allowed' });
    return;
  }

  try {
    const { db } = await connectToDatabase();
    const players = await db.collection('players').find({}).toArray();

    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
