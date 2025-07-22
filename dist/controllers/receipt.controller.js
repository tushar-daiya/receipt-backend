"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReceipt = exports.getPresignedUrl = exports.getReceiptById = exports.listReceipts = void 0;
const prisma_1 = require("../lib/prisma");
const s3client_1 = require("../lib/s3client");
const zod_1 = require("../schema/zod");
const listReceipts = async (req, res) => {
    try {
        const receipts = await prisma_1.prisma.receipt.findMany({
            where: {
                userId: req.user?.id,
            },
        });
        res
            .status(200)
            .json({ message: "Receipts fetched successfully", receipts });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.listReceipts = listReceipts;
const getReceiptById = async (req, res) => {
    const { id } = req.params;
    try {
        const receipt = await prisma_1.prisma.receipt.findUnique({
            where: {
                id: id,
            },
        });
        if (!receipt) {
            return res.status(404).json({ error: "Receipt not found" });
        }
        res.status(200).json({ message: "Receipt fetched successfully", receipt });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getReceiptById = getReceiptById;
const getPresignedUrl = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const key = `receipts/${req.user.id}/${Date.now()}.jpg`;
    const expiresIn = 3600;
    try {
        const url = await (0, s3client_1.generatePresignedUrl)(key, expiresIn);
        console.log(url);
        res.status(200).json({
            message: "Presigned URL generated successfully",
            data: { key, url },
        });
    }
    catch (error) {
        console.error("Error generating presigned URL:", error);
        res.status(500).json({ error: "Failed to generate presigned URL" });
    }
};
exports.getPresignedUrl = getPresignedUrl;
const addReceipt = async (req, res) => {
    console.log("Adding receipt:", req.body);
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const validatedData = await zod_1.receiptSchema.safeParse(req.body);
        if (!validatedData.success) {
            console.log("Validation failed:", validatedData.error);
            return res.status(400).json({ error: "Invalid receipt data" });
        }
        const url = process.env.R2_PUBLIC_URL + validatedData.data.imageKey;
        const receipt = await prisma_1.prisma.receipt.create({
            data: {
                amount: validatedData.data.amount,
                date: validatedData.data.date,
                category: validatedData.data.category,
                imageUrl: url,
                userId: req.user.id,
                transactionFee: validatedData.data.transactionFee,
                vendor: validatedData.data.vendor,
            },
        });
        res.status(201).json({ message: "Receipt added successfully", receipt });
    }
    catch (error) {
        console.error("Error adding receipt:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.addReceipt = addReceipt;
//# sourceMappingURL=receipt.controller.js.map