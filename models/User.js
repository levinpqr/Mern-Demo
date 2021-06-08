const mongoose = require("mongoose");

module.exports = User = mongoose.model(
    "user",
    new mongoose.Schema({
        first_name: { type: String, required: true },
        middle_name: { type: String, required: true },
        suffix: { type: String, required: false },
        last_name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        avatar: { type: String },
        date_created: { type: Date, default: Date.now },
    }),
    "user"
);
