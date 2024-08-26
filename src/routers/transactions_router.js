import { Router } from "express";
import transaction from "../transactions/create_transaction.js";
import transaction_list from "../transactions/list_transaction.js";
import { tokenValidate } from "../middlewares/auth_middleware.js";
import editTransactions from "../transactions/edit-transactions.js";
import deleteTransactions from "../transactions/delete_transactions.js";

const transactionsRouter = Router();

transactionsRouter.post("/transactions", tokenValidate, transaction);

transactionsRouter.get("/transactions", tokenValidate, transaction_list);

transactionsRouter.put("/transactions/:id", tokenValidate, editTransactions);

transactionsRouter.delete(
  "/transactions/:id",
  tokenValidate,
  deleteTransactions
);

export default transactionsRouter;
