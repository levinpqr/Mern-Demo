const Profile = require("../models/Profile");
const User = require("../models/User");
const Post = require("../models/Post");
const { validationResult } = require("express-validator");
const request = require("request");
const config = require("config");

async function me(req, res) {
    try {
        const profile = await Profile.findOne({
            user_id: req.user._id,
        }).populate({
            path: "user_id",
            model: "user",
            select: [
                "first_name",
                "middle_name",
                "suffix",
                "last_name",
                "avatar",
            ],
        });
        if (!profile) return res.status(404).json({ msg: "No profile found" });
        return res.json(profile);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
}

async function createProfile(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const {
        company,
        website,
        location,
        bio,
        status,
        github_username,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
    } = req.body;

    try {
        let social = {
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin,
        };
        Object.keys(social).forEach((key) => {
            if (social[key] === undefined || social[key] === null)
                delete social[key];
        });
        if (!Object.keys.length) social = undefined;

        let profileFields = {
            user_id: req.user._id,
            company,
            website,
            location,
            bio,
            status,
            github_username,
            skills:
                skills && typeof skills === "string"
                    ? skills.split(",").map((i) => i.trim())
                    : undefined,
            social,
        };

        Object.keys(profileFields).forEach((key) => {
            if (profileFields[key] === undefined || profileFields[key] === null)
                delete profileFields[key];
        });

        const profile = await Profile.findOneAndUpdate(
            { user_id: req.user._id },
            { $set: profileFields },
            { new: true, upsert: true }
        );
        return res.json(profile);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ msg: e.message });
    }
}

async function listProfiles(req, res) {
    try {
        const profiles = await Profile.find().populate({
            path: "user_id",
            model: "user",
            select: [
                "first_name",
                "middle_name",
                "suffix",
                "last_name",
                "avatar",
            ],
        });
        return res.json(profiles);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ msg: e.message });
    }
}

async function getProfileById(req, res) {
    try {
        const profile = await Profile.findOne({
            user_id: req.params.user_id,
        }).populate({
            path: "user_id",
            model: "user",
            select: [
                "first_name",
                "middle_name",
                "suffix",
                "last_name",
                "avatar",
            ],
        });
        if (!profile) return res.status(404).json({ msg: "Profile Not Found" });
        return res.json(profile);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ msg: e.message });
    }
}

async function deleteByToken(req, res) {
    try {
        await Post.deleteMany({ user_id: req.user._id });

        await Profile.findOneAndRemove({ user_id: req.user._id });
        await User.findByIdAndRemove(req.user._id);
        return res.json({ code: 200 });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ msg: e.message });
    }
}

async function putExperience(req, res) {
    const errors = validationResult(res);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
    } = req.body;

    const newExperience = {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
    };

    let manual_errors = [];
    if (!from) manual_errors.push({ msg: "From Date is required" });
    if (!current && !to) manual_errors.push({ msg: "To Date is required" });
    if (manual_errors.length)
        return res.status(400).json({ errors: manual_errors });

    try {
        const profile = await Profile.findOne({ user_id: req.user._id });
        profile.experiences.unshift(newExperience);
        await profile.save();
        return res.json(profile);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: e.message });
    }
}

async function removeProfileExperience(req, res) {
    try {
        const { exp_id } = req.params;
        const profile = await Profile.findOne({ user_id: req.user._id });
        let { experiences } = profile;
        if (!Array.isArray(experiences) || !experiences.length) {
            return res.status(412).json({ msg: "Experience does not exist" });
        }
        experiences = experiences.filter((i) => i._id.toString() !== exp_id);
        Object.assign(profile, { experiences });
        await profile.save();
        return res.json(profile);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ msg: e.message });
    }
}

async function putEducation(req, res) {
    const errors = validationResult(res);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, field, from, to, current, description } = req.body;

    const newEducation = {
        school,
        degree,
        field,
        from,
        to,
        current,
        description,
    };

    let manual_errors = [];
    if (!from) manual_errors.push({ msg: "From Date is required" });
    if (!current && !to) manual_errors.push({ msg: "To Date is required" });
    if (manual_errors.length)
        return res.status(400).json({ errors: manual_errors });

    try {
        const profile = await Profile.findOne({ user_id: req.user._id });
        profile.education.unshift(newEducation);
        await profile.save();
        return res.json(profile);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: e.message });
    }
}

async function removeProfileEducation(req, res) {
    try {
        const { edu_id } = req.params;
        const profile = await Profile.findOne({ user_id: req.user._id });
        let { education } = profile;
        if (!Array.isArray(education) || !education.length) {
            return res.status(412).json({ msg: "Education does not exist" });
        }
        education = education.filter((i) => i._id.toString() !== edu_id);
        Object.assign(profile, { education });
        await profile.save();
        return res.json(profile);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ msg: e.message });
    }
}

async function getGithubUserRepos(req, res) {
    try {
        const options = {
            uri: `https://api.github.com/users/${
                req.params.username
            }/repos?per_page=5&sort=created:asc&client_id=${config.get(
                "githubClientID"
            )}&client_secret=${config.get("githubClientSecret")}`,
            method: "GET",
            headers: { "user-agent": "node.js" },
        };

        request(options, (error, response, body) => {
            if (error) console.error(error);
            if (response.statusCode !== 200) {
                return res.status(404).json({ msg: "No Github Profile Found" });
            }
            return res.json(JSON.parse(body));
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ msg: e.message });
    }
}

module.exports = {
    me,
    createProfile,
    listProfiles,
    getProfileById,
    deleteByToken,
    putExperience,
    removeProfileExperience,
    putEducation,
    removeProfileEducation,
    getGithubUserRepos,
};
