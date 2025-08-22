import { prisma } from "@/lib/prisma";
import { Request, Response } from "express";

function serializeBigInt(obj: any) {
  return JSON.parse(
    JSON.stringify(obj, (_, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

const addTransaction = async (req: Request, res: Response) => {
  try {
    const { receiptId, gas, blockNumber, network, trxnHash, wallet_address } =
      req.body;
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    console.log("wallet_address", wallet_address);

    const lowerCaseWalletAddress = wallet_address?.toLowerCase();
    console.log("trxnHash", trxnHash);
    console.log(receiptId, gas, blockNumber, network, trxnHash);

    const trxnRes = await prisma.transactionHistory.create({
      data: {
        receiptId,
        gas: BigInt(gas),
        blockNumber: BigInt(blockNumber),
        network,
        trxnHash,
        wallet_address: lowerCaseWalletAddress,
        userId: user.id,
      },
    });

    console.log("trxnRes", trxnRes);

    return res.status(201).json({
      message: "created transaction successfully",
      trxnRes: serializeBigInt(trxnRes),
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getTransactions = async (req: Request, res: Response) => {
  try {
    const { wallet_address } = req.params;
    const lowercaseAddress = wallet_address?.toLowerCase();

    if (!lowercaseAddress) {
      return res
        .status(404)
        .json({ message: "error wallet address not found" });
    }

    const trxnResponse = await prisma.transactionHistory.findMany({
      where: {
        wallet_address: lowercaseAddress,
      },
    });

    return res.status(200).json({
      message: "your last transaction is",
      trxnResponse: serializeBigInt(trxnResponse),
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { addTransaction, getTransactions };
