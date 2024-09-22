"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            success: false,
            message: "Authorization token is missing or invalid"
        });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // @ts-ignore
        req.userId = decoded.id;
        next();
    }
    catch (err) {
        return res.status(403).json({
            success: false,
            message: "Token verification failed",
            error: err.message
        });
    }
};
exports.authMiddleware = authMiddleware;
exports.default = exports.authMiddleware;
