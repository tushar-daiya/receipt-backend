import { prisma } from "@/lib/prisma";
import { Request, Response } from "express";

const addTransaction = async (req: Request, res: Response) => {
  try {
    const { receiptId, gas, blockNumber, network, trxnHash } = req.body;
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const { wallet_address } = req.params;

    const lowerCaseWalletAddress = wallet_address?.toLowerCase();

    const trxnRes = await prisma.transactionHistory.create({
      data: {
        receiptId,
        gas: BigInt(gas),
        blockNumber: BigInt(blockNumber),
        network,
        trxnHash: trxnHash,
        wallet_address: lowerCaseWalletAddress,
        userId: user?.id,
      },
    });

    return res
      .status(201)
      .json({ message: "created transaction successfully", trxnRes });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Intternal server error" });
  }
};

const getTransactions = async (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.params;

    const lowercaseAddress = walletAddress.toLocaleLowerCase();

    if (!lowercaseAddress) {
      return res
        .status(404)
        .json({ message: "error wallet address dont found" });
    }

    const trxnResponse = await prisma.transactionHistory.findMany({
      where: {
        wallet_address: lowercaseAddress,
      },
    });

    return res
      .status(200)
      .json({ message: "your last transaction is ", trxnResponse });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Intternal server error" });
  }
};

export { addTransaction, getTransactions };
