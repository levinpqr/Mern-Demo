const { validationResult } = require("express-validator");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Post = require("../models/Post");

async function createPost(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        const user_id = req.user._id;
        const user = await User.findById(user_id).select({ password: 0 });
        const { first_name, middle_name, suffix, last_name, avatar } = user;
        const { text } = req.body;
        const newPost = new Post({
            user_id,
            first_name,
            middle_name,
            suffix,
            last_name,
            avatar,
            text,
        });
        const post = await newPost.save();
        return res.json(post);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ msg: e.message });
    }
}

async function getAllPosts(req, res) {
    try {
        const posts = await Post.find().sort({ date_created: -1 });
        return res.json(posts);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ msg: e.message });
    }
}

async function getPostById(req, res) {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ msg: "Post not found" });
        return res.json(post);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ msg: e.message });
    }
}

async function deletePostById(req, res) {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ msg: "Post not found" });
        let { _id } = req.user;
        _id = _id.toString();
        if (post.user_id.toString() !== _id)
            return res
                .status(401)
                .json({ msg: "Cannot remove another user's post" });

        await post.remove();
        return res.json({ msg: "Post removed" });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ msg: e.message });
    }
}

async function likeAPost(req, res) {
    try {
        const post = await Post.findById(req.params.id);
        const likes = post.likes || [];
        const wasLiked = likes.some(
            (i) => i.user_id.toString() === req.user._id
        );
        if (wasLiked)
            return res.status(400).json({ msg: "Post already liked" });
        likes.unshift({ user_id: req.user._id });
        Object.assign(post, { likes });
        await post.save();
        return res.json(post.likes);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ msg: e.message });
    }
}

async function unlikeAPost(req, res) {
    try {
        const post = await Post.findById(req.params.id);
        let likes = post.likes || [];
        const wasLiked = likes.some(
            (i) => i.user_id.toString() === req.user._id
        );
        if (!wasLiked)
            return res.status(400).json({ msg: "Post cannot be unliked" });
        likes = likes.filter((i) => i.user_id.toString() !== req.user._id);
        Object.assign(post, { likes });
        await post.save();
        return res.json(post.likes);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ msg: e.message });
    }
}

async function createComment(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    try {
        const post = await Post.findById(req.params.id);
        const { text } = req.body;
        const user_id = req.user._id;
        const user = await User.findById(user_id).select({
            email: 0,
            password: 0,
            date_created: 0,
        });
        const { first_name, middle_name, suffix, last_name, avatar } = user;
        const newComment = {
            user_id,
            text,
            first_name,
            middle_name,
            suffix,
            last_name,
            avatar,
        };
        const comments = post.comments || [];
        comments.push(newComment);
        Object.assign(post, { comments });
        await post.save();
        return res.json(post.comments);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ msg: e.message });
    }
}

async function deleteComment(req, res) {
    try {
        const { id, comment_id } = req.params;
        const user_id = req.user._id;
        const post = await Post.findById(id);
        let comments = post.comments || [];
        const comment = comments.find((i) => i._id.toString() === comment_id);
        if (!comment) return res.status(404).json({ msg: "Comment not found" });
        if (comment.user_id.toString() !== user_id)
            return res
                .status(401)
                .json({ msg: "Cannot delete comment of another user" });
        comments = comments.filter((i) => i._id.toString() !== comment_id);
        Object.assign(post, { comments });
        await post.save();
        return res.json(post.comments);
    } catch (e) {
        console.error(e);
        return res.json(500).msg({ msg: e.message });
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    deletePostById,
    likeAPost,
    unlikeAPost,
    createComment,
    deleteComment,
};
