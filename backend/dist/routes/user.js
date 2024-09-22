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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const Validation_1 = require("../Validation");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.userRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
exports.userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        const { success, error } = Validation_1.signupValidation.safeParse({ email, password, name });
        if (!success) {
            return res.status(400).json({
                success: false,
                message: "Validation Error",
                error: error.errors
            });
        }
        const userExist = yield prisma.user.findUnique({
            where: { email },
            select: {
                email: true,
                id: true,
                name: true
            }
        });
        if (userExist) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                name: name,
                balance: {
                    create: {
                        balance: 1 + Math.random() * 10000
                    }
                }
            }, select: {
                id: true,
                email: true,
                name: true,
                balance: true
            }
        });
        const tokenData = {
            id: user.id,
            email: user.email,
            name: user.name
        };
        const token = jsonwebtoken_1.default.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: user,
            token: token
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error during user creation",
            error: error.message
        });
    }
}));
exports.userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const { success, error } = Validation_1.signinValidation.safeParse({ email, password });
        if (!success) {
            return res.status(400).json({
                success: false,
                message: "Validation Error",
                error: error.errors
            });
        }
        const user = yield prisma.user.findUnique({
            where: { email },
            select: {
                email: true,
                id: true,
                name: true,
                password: true,
                balance: true
            }
        });
        if (!user) {
            return res.status(409).json({
                success: false,
                message: "User Not exists",
            });
        }
        const unHashedPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!unHashedPassword) {
            return res.status(401).json({
                success: false,
                message: "Password Not Matched!!",
            });
        }
        const tokenData = {
            id: user.id,
            email: user.email,
            name: user.name
        };
        const token = jsonwebtoken_1.default.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.status(201).json({
            success: true,
            message: "User Fetched successfully",
            token: token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error during user Signin",
            error: error.message
        });
    }
}));
exports.userRouter.get("/bulk", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = typeof req.query.filter === "string" ? req.query.filter : "";
        const allUsers = yield prisma.user.findMany({
            where: {
                OR: [
                    { name: { contains: filter, mode: "insensitive" } },
                    { email: { contains: filter, mode: "insensitive" } }
                ]
            },
            select: {
                email: true,
                id: true,
                name: true,
                balance: true
            }
        });
        if (allUsers.length === 0) {
            return res.status(200).json({
                success: false,
                message: "No users found",
                users: []
            });
        }
        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            users: allUsers
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error during fetching users",
            error: error.message
        });
    }
}));
exports.userRouter.post("/remove", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }
        const user = yield prisma.user.findUnique({
            where: {
                id
            }
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No user Found!!",
            });
        }
        yield prisma.user.delete({
            where: { id }
        });
        return res.status(200).json({
            success: true,
            message: "User Deleted successfully!!",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error during deleting user",
            error: error.message
        });
    }
}));
exports.userRouter.put("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, password } = req.body;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }
        const user = yield prisma.user.findUnique({
            where: {
                id
            }
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No user Found!!",
            });
        }
        const updateData = {};
        if (name)
            updateData.name = name;
        if (password)
            updateData.password = yield bcrypt_1.default.hash(password, 10);
        const updatedUser = yield prisma.user.update({
            where: { id: id },
            data: updateData
        });
        return res.status(200).json({
            success: true,
            message: "User Updated successfully!!",
            user: updatedUser
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error during updating user",
            error: error.message
        });
    }
}));
