import {MongoClient} from 'mongodb';
const connectionString = process.env.MONGO_URI || ''
const client = new MongoClient(connectionString, { maxIdleTimeMS:120000, minPoolSize:1, maxPoolSize:12 });

async function connectToServer() {
  await client.connect();
  return client;
}

export { connectToServer as connect }