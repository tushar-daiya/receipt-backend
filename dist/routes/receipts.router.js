"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const receipt_controller_1 = require("../controllers/receipt.controller");
const receiptsRouter = (0, express_1.Router)();
receiptsRouter.get("/", auth_middleware_1.authmiddleware, receipt_controller_1.listReceipts);
receiptsRouter.get("/:id", auth_middleware_1.authmiddleware, receipt_controller_1.getReceiptById);
receiptsRouter.post("/presigned-url", auth_middleware_1.authmiddleware, receipt_controller_1.getPresignedUrl);
receiptsRouter.post("/", auth_middleware_1.authmiddleware, receipt_controller_1.addReceipt);
exports.default = receiptsRouter;
//# sourceMappingURL=receipts.router.js.map