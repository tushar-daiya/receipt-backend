"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiptSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const receiptSchema = zod_1.default.object({
    vendor: zod_1.default.string().min(1, "Vendor is required"),
    date: zod_1.default.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    amount: zod_1.default.number().min(0, "Amount must be a positive number"),
    category: zod_1.default.string().min(1, "Category is required"),
    transactionFee: zod_1.default
        .number()
        .min(0, "Transaction fee must be a positive number"),
    imageKey: zod_1.default.string(),
});
exports.receiptSchema = receiptSchema;
//# sourceMappingURL=zod.js.map