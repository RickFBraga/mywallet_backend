import dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config();

const mongoUrl = process.env.DATABASE_URL;
const mongoClient = new MongoClient(mongoUrl);

function handleError(error) {
  console.error("Database conection error: ", error.message);
}

export async function connectDb() {
  await mongoClient
    .connect()
    .then(console.log("MongoDB Connected"))
    .catch((error) => handleError(error));
}

export const db = mongoClient.db();
