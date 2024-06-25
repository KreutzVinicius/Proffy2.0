import {MongoClient} from 'mongodb';
const connectionString =
    process.env.MONGO_URI ||
    'mongodb+srv://proffypassword:proffy@cluster0.8aiot.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const client = new MongoClient(connectionString, { maxIdleTimeMS:120000, minPoolSize:1, maxPoolSize:12 });

async function connectToServer() {
  await client.connect();
  return client;
}

export { connectToServer as connect }