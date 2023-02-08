const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userRoleSchema = new Schema({
    role_id: String,
    role_name: String,

});

const userRoleModel = mongoose.model("role", userRoleSchema);

module.exports = { userRoleModel }