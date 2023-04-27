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
exports.deleteSite = exports.getAllMissions = exports.createMission = void 0;
const mission_model_1 = __importDefault(require("../models/mission-model"));
const createMission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { alt, speed, name, waypoints } = req.body;
    if (!alt || !speed || !name || !waypoints) {
        return res
            .status(200)
            .json({ errors: [{ msg: "All fields are required" }] });
    }
    try {
        const newMission = new mission_model_1.default({
            alt,
            speed,
            name,
            waypoints,
            created_by: req.user._id,
        });
        const createdMission = yield newMission.save();
        return res.status(200).json(createdMission);
    }
    catch (err) {
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});
exports.createMission = createMission;
const getAllMissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allSites = yield mission_model_1.default.find();
    return res.status(200).json(allSites);
});
exports.getAllMissions = getAllMissions;
const deleteSite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const missionId = req.params.siteId;
    try {
        yield mission_model_1.default.findOneAndDelete({ _id: missionId });
        return res.status(200).json({ msg: "Site Delete Successfully" });
    }
    catch (err) {
        return res.status(404).json({ msg: "This site does not exist" });
    }
});
exports.deleteSite = deleteSite;
