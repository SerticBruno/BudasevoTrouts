// pages/api/players/[id].js

import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../app/lib/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const updatedPlayer = req.body;
      const result = await db.collection('players').updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedPlayer }
      );

      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: 'Player not found or data is the same' });
      }

      res.status(200).json({ message: 'Player updated', _id: id, updatedPlayer });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const result = await db.collection('players').deleteOne({ _id: new ObjectId(id) });

      if (!result.deletedCount) {
        return res.status(404).json({ message: 'Player not found' });
      }

      res.status(200).json({ message: 'Player deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}