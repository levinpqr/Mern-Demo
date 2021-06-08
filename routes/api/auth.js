const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check } = require("express-validator");
const { getUserByToken, login } = require("../../controllers/auth");

const middleRoute = "Auth";

router.use(function (req, res, next) {
    console.log(`MIDDLE FUNCTION FOR ${middleRoute}`);
    next();
});

router.get("/", auth, getUserByToken);

router.post(
    "/",
    [
        check("email", "Valid email is required").isEmail(),
        check("password", "Password is required").exists(),
    ],
    login
);

module.exports = router;
