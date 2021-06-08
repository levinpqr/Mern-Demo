const gravatar = require("gravatar");
const bycrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { validationResult } = require("express-validator");

async function createUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const {
        first_name,
        middle_name,
        suffix,
        last_name,
        email,
        password,
        passwordConf,
    } = req.body;

    if (passwordConf !== password)
        return res
            .status(400)
            .json({ errors: [{ msg: "Passwords do not match" }] });

    let isSaved = false;
    let user;
    try {
        user = await User.findOne({ email });
        if (user)
            return res
                .status(400)
                .json({ errors: [{ msg: "User already exists" }] });

        const avatar = gravatar.url(email, {
            s: "200",
            r: "pg",
            d: "mm",
        });

        const salt = await bycrypt.genSalt(10);
        const generatedPassword = await bycrypt.hash(password, salt);
        console.log("SALT AND PW", salt, password);

        user = new User({
            first_name,
            middle_name,
            suffix,
            last_name,
            email,
            password: generatedPassword,
            avatar,
            date_created: new Date(),
        });

        await user.save();
        console.log("USER CREATED!");
        isSaved = true;

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
        console.error(e);
        if (isSaved) {
            await User.findByIdAndDelete(user._id)
                .then(() => console.log("SUCCESSFUL ROLLBACK"))
                .catch((e) => console.log(e));
        }
        return res.status(500).json({
            errors: [{ msg: e.message || "Internal Server Error" }],
        });
    }
}

module.exports = { createUser };
