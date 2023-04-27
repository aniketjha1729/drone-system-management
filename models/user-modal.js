"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_2 = require("mongoose");
// interface IUser {
//   name: string;
//   email: string;
//   password: string;
const userSchema = new mongoose_2.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});
const User = (0, mongoose_2.model)("User", userSchema);
exports.default = User;
