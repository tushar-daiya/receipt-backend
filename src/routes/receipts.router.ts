import { Router } from "express";
import { authmiddleware } from "../middlewares/auth.middleware";
import {
  addReceipt,
  getPresignedUrl,
  getReceiptById,
  listReceipts,
} from "../controllers/receipt.controller";

const receiptsRouter = Router();

receiptsRouter.get("/", authmiddleware, listReceipts);
receiptsRouter.get("/:id", authmiddleware, getReceiptById);
receiptsRouter.post("/presigned-url", authmiddleware, getPresignedUrl);
receiptsRouter.post("/", authmiddleware, addReceipt);
export default receiptsRouter;
