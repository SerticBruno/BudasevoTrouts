import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(process.env.NEXT_PUBLIC_MONGODB_URI);

  await client.connect();
  const db = client.db(process.env.NEXT_PUBLIC_MONGODB_DB);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
