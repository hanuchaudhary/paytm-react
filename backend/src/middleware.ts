import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            success: false,
            message: "Authorization token is missing or invalid"
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; email: string; name: string };
        // @ts-ignore
        req.userId = decoded.id; 
        next();
    } catch (err : any) {
        return res.status(403).json({
            success: false,
            message: "Token verification failed",
            error: err.message
        });
    }
};

export default authMiddleware;
