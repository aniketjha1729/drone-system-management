"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
exports.userRoute = express_1.default.Router();
exports.userRoute.get("/test", (req, res) => {
    res.status(200).json({
        Message: "User Routes Working",
    });
});
exports.userRoute.post("/signin", (req, res) => {
    const { email, password } = req.body;
    res.send({ email: email, password: password });
});
