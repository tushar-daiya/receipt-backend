import { addWallet } from "@/controllers/wallet.controller";
import { authmiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";

const router: Router = Router();

router.post("/", authmiddleware, addWallet);

export default router;
