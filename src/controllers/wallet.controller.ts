import { prisma } from "../lib/prisma";

import { Request, Response } from "express";

const addWallet = async (req: Request, res: Response) => {
  try {
    const { wallet_address } = req.body;
    console.log("wallet", wallet_address);

    if (!wallet_address || typeof wallet_address !== "string") {
      return res.status(400).json({ error: "wallet_address is required" });
    }

    const lowercaseAddress = wallet_address.toLowerCase();
    const userId = req.user?.id;
    if (!userId) {
      return res.status(404).json({ error: "user doesnt exist" });
    }
    const userExist = await prisma.user.findUnique({
      where: {
        id: req.user?.id,
      },
    });
    if (!userExist) {
      return res.status(404).json({ error: "user already exist" });
    }

    const walletExist = await prisma.walletConnection.findUnique({
      where: {
        wallet_address: lowercaseAddress,
      },
    });

    if (walletExist) {
      return res.status(404).json({ message: "wallet already exists" });
    }

    const walletresponse = await prisma.walletConnection.create({
      data: {
        userId: userId,
        wallet_address: lowercaseAddress,
      },
    });
    return res
      .status(201)
      .json({ message: "created wallet successfully", walletresponse });
  } catch (error) {
    console.error("Error in addWallet function:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { addWallet };
