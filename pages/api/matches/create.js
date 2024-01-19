import { connectToDatabase } from '../../../app/lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Only POST requests allowed' });
    return;
  }

  try {
    const { db } = await connectToDatabase();
    const result = await db.collection('matches').insertOne({
      ...req.body,
      status: 'in playing', // Default status
      createdAt: new Date(),
    });

    if (!result.acknowledged) {
      throw new Error('Insert operation failed');
    }

    // Create an object to send back, including the inserted ID and the match data
    const insertedMatch = { _id: result.insertedId, ...req.body, status: 'in playing', createdAt: new Date() };
    res.status(201).json(insertedMatch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
