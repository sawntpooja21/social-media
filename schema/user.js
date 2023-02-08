const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_id: String,
    name: String,
    email: String,
    password: String,
    role_id: { type: Number, default: 2 }
});

const UserModel = mongoose.model("users", userSchema);

module.exports = { UserModel };