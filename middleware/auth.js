"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_modal_1 = __importDefault(require("../models/user-modal"));
const authKey = process.env.SECRET_AUTH_KEY;
const isUserAuth = (req, res, next) => {
    const token = req.header("Bearer");
    if (token) {
        jsonwebtoken_1.default.verify(token, `${authKey}`, (err, payload) => {
            if (err) {
                return res.status(401).json({ errors: [{ msg: "Invalid token" }] });
            }
            const { _id } = payload;
            user_modal_1.default.findById(_id)
                .select("-password")
                .then((userdata) => {
                req.user = userdata;
                next();
            });
        });
    }
    else {
        return res.status(401).json({ errors: [{ msg: "Token required" }] });
    }
};
exports.isUserAuth = isUserAuth;
