const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const { createUser } = require("../../controllers/user");

const middleRoute = "User";

router.use(function (req, res, next) {
    console.log(`MIDDLE FUNCTION FOR ${middleRoute}`);
    next();
});

router.post(
    "/",
    [
        check("first_name", "First Name is required").not().isEmpty(),
        check("middle_name", "Middle Name is required").not().isEmpty(),
        check("last_name", "Last Name is required").not().isEmpty(),
        check("email", "Valid email is required").isEmail(),
        check("password", `6 characters password is required`).isLength({
            min: 6,
        }),
        check("passwordConf", `Confirm password is required`).isLength({
            min: 6,
        }),
    ],
    createUser
);

module.exports = router;
