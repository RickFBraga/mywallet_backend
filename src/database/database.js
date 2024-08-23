import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const mongoUri = process.env.DATABASE_URL;

if (!mongoUri) {
  throw new Error("DATABASE_URL is not defined in the environment variables");
}

const mongoClient = new MongoClient(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export let db;

mongoClient
  .connect()
  .then(() => {
    db = mongoClient.db();
    console.log("Banco de Dados conectado com sucesso!");
  })
  .catch((err) =>
    console.error("Erro ao conectar ao banco de dados:", err.message)
  );
