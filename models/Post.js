const mongoose = require("mongoose");

module.exports = Profile = mongoose.model(
    "post",
    new mongoose.Schema({
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        text: { type: String, required: true },
        first_name: { type: String, required: true },
        middle_name: { type: String, required: true },
        suffix: { type: String, required: false },
        last_name: { type: String, required: true },
        avatar: { type: String, required: false },
        date_created: { type: Date, default: Date.now },
        likes: [
            { user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" } },
        ],
        comments: [
            {
                user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
                text: { type: String, required: true },
                first_name: { type: String, required: true },
                middle_name: { type: String, required: true },
                suffix: { type: String, required: false },
                last_name: { type: String, required: true },
                avatar: { type: String, required: false },
                date_created: { type: Date, default: Date.now },
            },
        ],
    }),

    "post"
);
