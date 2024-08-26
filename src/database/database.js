import dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config();

const mongoUrl = process.env.DATABASE_URL;
const mongoClient = new MongoClient(mongoUrl);

try {
  await mongoClient.connect();
  console.log("MongoDB conectado!");
} catch (error) {
  console.log(error.message);
}

export const db = mongoClient.db();
