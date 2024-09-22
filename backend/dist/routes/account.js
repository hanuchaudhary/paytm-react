"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountRouter = void 0;
const express_1 = __importDefault(require("express"));
const middleware_1 = __importDefault(require("../middleware"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.accountRouter = express_1.default.Router();
exports.accountRouter.get("/balance", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID not found in request"
            });
        }
        const user = yield prisma.account.findUnique({
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching balance",
            error: error.message
        });
    }
}));
exports.accountRouter.post("/transfer", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, to } = req.body;
    try {
        const result = yield prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
            //sendr acc
            const account = yield prisma.account.findUnique({
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
            const toAccount = yield prisma.account.findUnique({
                where: {
                    userId: to
                }
            });
            if (!toAccount) {
                throw new Error("Invalid recipient account");
            }
            yield prisma.account.update({
                where: { userId: req.userId },
                data: {
                    balance: {
                        decrement: amount
                    }
                }
            });
            yield prisma.account.update({
                where: { userId: to },
                data: {
                    balance: {
                        increment: amount
                    }
                }
            });
            return { success: true, message: "Transfer successful" };
        }));
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}));
