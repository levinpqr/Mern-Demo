const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async function (req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).json({ msg: "No token provided" });

    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        req.user = decoded.user;
        next();
    } catch (e) {
        res.status(402).json({ msg: "Invalid token" });
    }
};
