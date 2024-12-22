const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret_key";

module.exports = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(403).json({ message: "No token, authorization denied" });

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified.user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token is not valid" });
    }
};
