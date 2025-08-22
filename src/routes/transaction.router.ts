import {
  addTransaction,
  getTransactions,
} from "../controllers/transaction.controller";
import { authmiddleware } from "../middlewares/auth.middleware";
import { Router } from "express";

const transactionRouter: Router = Router();

transactionRouter.post("/", authmiddleware, addTransaction);
transactionRouter.get("/:wallet_address", authmiddleware, getTransactions);

export default transactionRouter;
