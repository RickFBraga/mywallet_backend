import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routers/auth_router.js';
import transactionsRouter from './routers/transactions_router.js';
import { db } from './database/database.js';
dotenv.config();

const server = express();
server.use(json());
server.use(cors());

server.use(authRouter);
server.use(transactionsRouter);

const port = process.env.PORT || 5000;

server.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${port}`);
});
