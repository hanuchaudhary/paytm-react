import { PrismaClient } from "@prisma/client/edge";
import bcrypt from 'bcryptjs';
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const accountRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string,
    },
}>();


accountRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";

    try {
        const userVerify = await verify(authHeader, c.env.JWT_SECRET);

        if (userVerify) {
            c.set("userId", userVerify.id as string);
            await next();
        } else {
            c.status(403);
            return c.json({ msg: "Invalid token!!!" });
        }

    } catch (err) {
        c.status(403);
        return c.json({ msg: "Invalid or expired token!!!" });
    }
});

accountRouter.get("/balance", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const userId = c.get("userId");

        if (!userId) {
            c.status(400)
            return c.json({
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
            c.status(404)
            return c.json({
                success: false,
                message: "Balance not found for the user"
            });
        }

        return c.json({
            success: true,
            balance: user.balance,
            userDetails: user
        });

    } catch (error: any) {
        c.status(500)
        return c.json({
            success: false,
            message: "Error fetching balance",
            error: error.message
        });
    }
});

accountRouter.post("/transfer", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const { amount, to } = await c.req.json();

    try {
        const result = await prisma.$transaction(async (prisma) => {
            //sendr acc
            const account = await prisma.account.findUnique({
                where: {
                    userId: c.get("userId")
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
                where: { userId: c.get("userId") },
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

        c.status(200)
        return c.json(result);

    } catch (error: any) {
        c.status(400)
        return c.json({
            success: false,
            message: error.message,
        });
    }
});
