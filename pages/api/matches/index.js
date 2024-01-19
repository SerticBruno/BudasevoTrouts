import { connectToDatabase } from "../../../app/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Only GET requests allowed' });
    return;
  }

  try {
    const { db } = await connectToDatabase();
    const matches = await db.collection('matches').find({}).toArray();
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
