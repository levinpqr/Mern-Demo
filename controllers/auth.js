const { validationResult } = require("express-validator");
const User = require("../models/User");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

async function getUserByToken(req, res) {
    try {
        const user = await User.findById(req.user._id).select({ password: 0 });
        if (!user) throw Error("User does not exist");
        res.json(user);
    } catch (e) {
        console.error(e);
        res.status(404).json({ msg: e.message });
    }
}

async function login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user)
            return res
                .status(401)
                .json({ errors: [{ msg: "Invalid credentials" }] });

        const isMatch = bycrypt.compareSync(password, user.password);
        if (!isMatch)
            return res
                .status(401)
                .json({ errors: [{ msg: "Invalid credentials" }] });

        jwt.sign(
            {
                user: {
                    _id: user._id,
                },
            },
            config.get("jwtSecret"),
            { expiresIn: 3600 * 24 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errors: [{ msg: e.message || "Internal Server Error" }],
        });
    }
}

module.exports = {
    getUserByToken,
    login,
};
