const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided!!!"
        });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: "Failed to authenticate token!!!"
            });
        }

        req.userId = decoded.id;
        next();
    });
};

module.exports = {
    authMiddleware
}