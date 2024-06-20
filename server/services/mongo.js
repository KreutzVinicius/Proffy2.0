import {MongoClient} from 'mongodb';
const connectionString = 'mongodb+srv://endrewrthang:ugObbkAO7Rd2siDC@cluster0.8aiot.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(connectionString, { maxIdleTimeMS:120000, minPoolSize:1, maxPoolSize:12 });

async function connectToServer() {
  await client.connect();
  return client;
}

export { connectToServer as connect }