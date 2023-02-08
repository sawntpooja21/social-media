const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userPostSchema = new Schema({
    post_id: String,
    user_id: String,
    post_message: String,
    previous_message: [String],
    is_active: Number
});

const userPostModel = mongoose.model("userPosts", userPostSchema);

module.exports = { userPostModel }