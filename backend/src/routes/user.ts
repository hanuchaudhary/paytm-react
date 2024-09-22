import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { signinValidation, signupValidation } from "../Validation";
import dotenv from 'dotenv';
dotenv.config();

export const userRouter = express.Router();
const prisma = new PrismaClient();

userRouter.post("/signup", async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const { success, error } = signupValidation.safeParse({ email, password, name });
        if (!success) {
            return res.status(400).json({
                success: false,
                message: "Validation Error",
                error: error.errors
            });
        }

        const userExist = await prisma.user.findUnique({
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

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
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
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET as string, { expiresIn: "1h" })

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: user,
            token: token
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Server error during user creation",
            error: error.message
        });
    }
});

userRouter.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        const { success, error } = signinValidation.safeParse({ email, password });
        if (!success) {
            return res.status(400).json({
                success: false,
                message: "Validation Error",
                error: error.errors
            });
        }

        const user = await prisma.user.findUnique({
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

        const unHashedPassword = await bcrypt.compare(password, user.password);
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
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET as string, { expiresIn: "1h" })

        return res.status(201).json({
            success: true,
            message: "User Fetched successfully",
            token : token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Server error during user Signin",
            error: error.message
        });
    }
});

userRouter.get("/bulk", async (req, res) => {
    try {
        const filter = typeof req.query.filter === "string" ? req.query.filter : "";

        const allUsers = await prisma.user.findMany({
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

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Server error during fetching users",
            error: error.message
        });
    }
});

userRouter.post("/remove", async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No user Found!!",
            });
        }

        await prisma.user.delete({
            where: { id }
        })

        return res.status(200).json({
            success: true,
            message: "User Deleted successfully!!",
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Server error during deleting user",
            error: error.message
        });
    }
})

userRouter.put("/update", async (req, res) => {
    try {
        const { id, name, password } = req.body;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No user Found!!",
            });
        }

        const updateData: any = {};
        if (name) updateData.name = name;
        if (password) updateData.password = await bcrypt.hash(password, 10);

        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: updateData
        })

        return res.status(200).json({
            success: true,
            message: "User Updated successfully!!",
            user: updatedUser
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Server error during updating user",
            error: error.message
        });
    }
})
