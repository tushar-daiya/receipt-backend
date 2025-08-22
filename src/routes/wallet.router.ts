import { addWallet } from "@/controllers/wallet.controller";
import { authmiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";

const walletRouter: Router = Router();

walletRouter.post("/", authmiddleware, addWallet);

export default walletRouter;
