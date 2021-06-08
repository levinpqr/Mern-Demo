const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check } = require("express-validator");
const {
    createPost,
    getAllPosts,
    getPostById,
    deletePostById,
    likeAPost,
    unlikeAPost,
    createComment,
    deleteComment,
} = require("../../controllers/post");

const middleRoute = "Post";

router.use(function (req, res, next) {
    console.log(`MIDDLE FUNCTION FOR ${middleRoute}`);
    next();
});

router.post(
    "/",
    [auth, [check("text", "Text is required").not().isEmpty()]],
    createPost
);

router.get("/", auth, getAllPosts);
router.get("/:id", auth, getPostById);
router.delete("/:id", auth, deletePostById);
router.put("/like/:id", auth, likeAPost);
router.put("/unlike/:id", auth, unlikeAPost);
router.post(
    "/:id/comment",
    [auth, [check("text", "Text is required").not().isEmpty()]],
    createComment
);
router.delete("/:id/comment/:comment_id", auth, deleteComment);

module.exports = router;
