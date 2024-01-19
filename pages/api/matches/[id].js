import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../app/lib/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const { id } = req.query;

    if (req.method === 'PUT') {
        try {
        const updatedData = req.body;
        delete updatedData._id; // Remove _id field from the update data

        const response = await db.collection('matches').updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedData }
        );

        if (!response.modifiedCount) {
            return res.status(404).json({ message: 'Match not found' });
        }

        res.status(200).json({ message: 'Match updated', _id: id });
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    }
    else if (req.method === 'DELETE') {
        try {
        const response = await db.collection('matches').deleteOne({ _id: new ObjectId(id) });

        if (!response.deletedCount) {
            return res.status(404).json({ message: 'Match not found' });
        }

        res.status(200).json({ message: 'Match deleted' });
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    }
    else {
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  


}