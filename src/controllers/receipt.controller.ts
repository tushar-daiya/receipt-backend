import { prisma } from "../lib/prisma";
import type { Request, Response } from "express";
import { generatePresignedUrl } from "../lib/s3client";
import { receiptSchema } from "../schema/zod";
const listReceipts = async (req: Request, res: Response) => {
  try {
    const receipts = await prisma.receipt.findMany({
      where: {
        userId: req.user?.id,
      },
    });
    res
      .status(200)
      .json({ message: "Receipts fetched successfully", receipts });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getReceiptById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const receipt = await prisma.receipt.findUnique({
      where: {
        id: id,
      },
    });
    if (!receipt) {
      return res.status(404).json({ error: "Receipt not found" });
    }
    res.status(200).json({ message: "Receipt fetched successfully", receipt });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPresignedUrl = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const key = `receipts/${req.user.id}/${Date.now()}.jpg`;
  const expiresIn = 3600; // 1 hour
  try {
    const url = await generatePresignedUrl(key, expiresIn);
    console.log(url);
    res.status(200).json({
      message: "Presigned URL generated successfully",
      data: { key, url },
    });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    res.status(500).json({ error: "Failed to generate presigned URL" });
  }
};

const addReceipt = async (req: Request, res: Response) => {
  console.log("Adding receipt:", req.body);
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const validatedData = await receiptSchema.safeParse(req.body);
    if (!validatedData.success) {
      console.log("Validation failed:", validatedData.error);
      return res.status(400).json({ error: "Invalid receipt data" });
    }
    const url = process.env.R2_PUBLIC_URL + validatedData.data.imageKey;
    const receipt = await prisma.receipt.create({
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
  } catch (error) {
    console.error("Error adding receipt:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { listReceipts, getReceiptById, getPresignedUrl, addReceipt };
