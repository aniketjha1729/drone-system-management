"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.missionRoute = void 0;
const express_1 = __importDefault(require("express"));
const mission_1 = require("../controller/mission");
const auth_1 = require("../middleware/auth");
exports.missionRoute = express_1.default.Router();
exports.missionRoute.get("/test", (req, res) => {
    res.status(200).json({
        Message: "Mission Routes Working",
    });
});
exports.missionRoute.post("/", auth_1.isUserAuth, mission_1.createMission);
exports.missionRoute.get("/", auth_1.isUserAuth, mission_1.getAllMissions);
