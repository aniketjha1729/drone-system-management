"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.droneRoute = void 0;
const express_1 = __importDefault(require("express"));
const drone_1 = require("../controller/drone");
const auth_1 = require("../middleware/auth");
exports.droneRoute = express_1.default.Router();
exports.droneRoute.get("/test", (req, res) => {
    res.status(200).json({
        Message: "Drone Routes Working",
    });
});
exports.droneRoute.post("/createdrone", auth_1.isUserAuth, drone_1.createDrone);
exports.droneRoute.get("/allDrones", auth_1.isUserAuth, drone_1.getAllDrones);
