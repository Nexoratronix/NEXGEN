
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
console.log("MONGODB_URI:", uri);
let client;
let clientPromise;

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}
const options = {};
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect().then(() => {
      console.log("Connected to MongoDB in development");
      return client;
    }).catch(err => {
      console.error("Connection failed in development:", err);
      throw err;
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  clientPromise = client.connect().then(() => {
    console.log("Connected to MongoDB in production");
    return client;
  }).catch(err => {
    console.error("Connection failed in production:", err);
    throw err;
  });
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME || "NEXGEN");
  console.log("Database selected:", db.databaseName);
  return { db, client };
}