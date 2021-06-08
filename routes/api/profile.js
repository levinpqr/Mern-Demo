const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check } = require("express-validator");
const {
    me,
    createProfile,
    listProfiles,
    getProfileById,
    deleteByToken,
    putExperience,
    removeProfileExperience,
    putEducation,
    removeProfileEducation,
    getGithubUserRepos
} = require("../../controllers/profile");

const middleRoute = "Profile";

router.use(function (req, res, next) {
    console.log(`MIDDLE FUNCTION FOR ${middleRoute}`);
    next();
});

router.get("/me", auth, me);

router.post(
    "/",
    [
        auth,
        [
            check("status", "Status is required").not().isEmpty(),
            check("skills", "Skills field is required").not().isEmpty(),
        ],
    ],
    createProfile
);

router.get("/", listProfiles);

router.get("/user/:user_id", getProfileById);

router.delete("/", auth, deleteByToken);

router.put(
    "/experience",
    [
        auth,
        [
            check("title", "Title is required").not().isEmpty(),
            check("company", "Company is required").not().isEmpty(),
            check("from", "From Date is required").not().isEmpty(),
        ],
    ],
    putExperience
);

router.put(
    "/education",
    [
        auth,
        [
            check("school", "School is required").not().isEmpty(),
            check("degree", "Degree is required").not().isEmpty(),
            check("field", "Field is required").not().isEmpty(),
            check("from", "From Date is required").not().isEmpty(),
        ],
    ],
    putEducation
);

router.delete("/experience/:exp_id", auth, removeProfileExperience);

router.delete("/education/:edu_id", auth, removeProfileEducation);

router.get('/github/:username', getGithubUserRepos);

module.exports = router;
