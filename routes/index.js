"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("./user");
const drone_1 = require("./drone");
exports.routes = express_1.default.Router();
exports.routes.use("/user", user_1.userRoute);
exports.routes.use("/drone", drone_1.droneRoute);
