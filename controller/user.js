"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const user_modal_1 = __importDefault(require("../models/user-modal"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authKey = process.env.SECRET_AUTH_KEY;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return res
            .status(200)
            .json({ errors: [{ msg: "All fields are required" }] });
    try {
        let user = yield user_modal_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: "User already exists" }] });
        }
        const newuser = new user_modal_1.default({
            name,
            email,
            password,
        });
        bcrypt_1.default.genSalt(10, (err, salt) => {
            bcrypt_1.default.hash(newuser.password, salt, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
                if (err)
                    throw err;
                newuser.password = hash;
                yield newuser.save();
                return res.status(200).json({ success: [{ msg: "Signup Success" }] });
            }));
        });
    }
    catch (err) {
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield user_modal_1.default.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .json({ errors: [{ msg: "User does not exists" }] });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
        }
        const userAuthToken = jsonwebtoken_1.default.sign({
            _id: user._id,
        }, `${authKey}`, {
            expiresIn: "48h",
        });
        return res.status(200).json({
            userAuthToken,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});
exports.signIn = signIn;
