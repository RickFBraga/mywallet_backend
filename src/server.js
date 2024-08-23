import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routers/auth_router.js";
import transactionsRouter from "./routers/transactions_router.js";

dotenv.config();

const server = express();
server.use(json());
server.use(cors());

server.use(authRouter);

server.use(transactionsRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
