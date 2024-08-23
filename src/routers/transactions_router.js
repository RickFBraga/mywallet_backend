import { Router } from "express";
import transaction from "../transactions/create_transaction.js";
import transaction_list from "../transactions/list_transaction.js";
import { tokenValidate } from "../middlewares/auth_middleware.js";
import editTransactions from "../transactions/edit-transactions.js";
import deleteTransactions from "../transactions/delete_transactions.js";

const transactionsRouter = Router();

transactionsRouter.post("/transactions", tokenValidate, transaction);

transactionsRouter.get("/transactions", transaction_list);

transactionsRouter.put("/transactions/:id", editTransactions);

transactionsRouter.delete("/transactions/:id", deleteTransactions);

export default transactionsRouter;
