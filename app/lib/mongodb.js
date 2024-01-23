import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient('mongodb+srv://budasevo:budasevo13Admin@budasevotrouts.rm3sk21.mongodb.net/?retryWrites=true&w=majority');

  await client.connect();
  const db = client.db('BudasevoTrouts');

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
