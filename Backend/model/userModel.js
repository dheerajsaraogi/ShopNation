const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, requiired: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    userType: { type: String, default: "customer" },
    createdOn: { type: Date, default: new Date() }
});

module.exports = mongoose.model("Users", userSchema);