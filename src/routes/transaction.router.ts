import { addTransaction } from "@/controllers/transaction.controller";
import { authmiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";

const transactionRouter: Router = Router();

transactionRouter.post("/", authmiddleware, addTransaction);

export default transactionRouter;
