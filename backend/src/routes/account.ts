import express from "express";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
    try {
        //@ts-ignore
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID not found in request"
            });
        }

        const user = await prisma.account.findUnique({
            where: {
                userId: userId
            },
            select: {
                userId: true,
                balance: true,
                user: {
                    select: {
                        email: true,
                        name: true
                    }
                }
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Balance not found for the user"
            });
        }

        res.json({
            success: true,
            user: user
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Error fetching balance",
            error: error.message
        });
    }
});
accountRouter.post("/transfer", authMiddleware, async (req, res) => {
    const { amount, to } = req.body;

    try {
        const result = await prisma.$transaction(async (prisma) => {
            //sendr acc
            const account = await prisma.account.findUnique({
                where: {
                    userId: req.userId
                }
            });

            if (!account) {
                throw new Error("Sender account not found");
            }

            if (account.balance < amount) {
                throw new Error("Insufficient balance");
            }

            //reciever acc
            const toAccount = await prisma.account.findUnique({
                where: {
                    userId: to
                }
            });

            if (!toAccount) {
                throw new Error("Invalid recipient account");
            }

            await prisma.account.update({
                where: { userId: req.userId },
                data: {
                    balance: {
                        decrement: amount
                    }
                }
            });

            await prisma.account.update({
                where: { userId: to },
                data: {
                    balance: {
                        increment: amount
                    }
                }
            });

            return { success: true, message: "Transfer successful" };
        });

        return res.status(200).json(result);

    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
