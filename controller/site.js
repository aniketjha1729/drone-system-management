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
exports.getMissions = exports.getDrones = exports.addMissionToSite = exports.addDroneToSite = exports.deleteMission = exports.deleteDrone = exports.deleteSite = exports.updateSite = exports.getSiteById = exports.getAllSites = exports.createSites = void 0;
const sites_model_1 = __importDefault(require("../models/sites-model"));
const createSites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { site_name, latitude, longitude } = req.body;
    if (!site_name || !latitude || !longitude)
        return res.status(200).json({ errors: [{ msg: "All fields are required" }] });
    try {
        const position = {
            latitude,
            longitude
        };
        const newDrone = new sites_model_1.default({
            site_name,
            position,
            created_by: req.user._id
        });
        const createdDrone = yield newDrone.save();
        return res.status(200).json(createdDrone);
    }
    catch (err) {
        return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
});
exports.createSites = createSites;
const getAllSites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allSites = yield sites_model_1.default.find().populate("created_by", "name email");
    return res.status(200).json(allSites);
});
exports.getAllSites = getAllSites;
const getSiteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const siteId = req.params.siteId;
    const allSites = yield sites_model_1.default.findById(siteId).populate("created_by", "name email").populate("drones missions", "drone_type maker_name name speed alt");
    return res.status(200).json(allSites);
});
exports.getSiteById = getSiteById;
const updateSite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const siteId = req.params.siteId;
    const { site_name, latitude, longitude } = req.body;
    try {
        const site = yield sites_model_1.default.findByIdAndUpdate(siteId, { site_name, latitude, longitude }, { new: true, lean: true });
        return res.status(200).json(site);
    }
    catch (err) {
        return res.status(404).json({ msg: "This site does not exist" });
    }
});
exports.updateSite = updateSite;
const deleteSite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const siteId = req.params.siteId;
    try {
        yield sites_model_1.default.findOneAndDelete({ _id: siteId });
        return res.status(200).json({ msg: "Site Deleted Successfully" });
    }
    catch (err) {
        return res.status(404).json({ msg: "This site does not exist" });
    }
});
exports.deleteSite = deleteSite;
const deleteDrone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const siteId = req.params.siteId;
    try {
        yield sites_model_1.default.findByIdAndUpdate({ _id: siteId }, { $pull: { drones: req.params.droneId } }, { new: true, lean: true });
        return res.status(200).json({ msg: "Drone Deleted Successfully" });
    }
    catch (err) {
        return res.status(404).json({ msg: "This site does not exist" });
    }
});
exports.deleteDrone = deleteDrone;
const deleteMission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const siteId = req.params.siteId;
    try {
        yield sites_model_1.default.findByIdAndUpdate({ _id: siteId }, { $pull: { missions: req.params.missionId } }, { new: true, lean: true });
        return res.status(200).json({ msg: "Mission Deleted Successfully" });
    }
    catch (err) {
        return res.status(404).json({ msg: "This site does not exist" });
    }
});
exports.deleteMission = deleteMission;
const addDroneToSite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const siteId = req.params.siteId;
    try {
        const site = yield sites_model_1.default.findByIdAndUpdate(siteId, { $push: { drones: req.params.droneId } }, { new: true, lean: true });
        return res.status(200).json(site);
    }
    catch (err) {
        return res.status(404).json({ msg: "This site does not exist" });
    }
});
exports.addDroneToSite = addDroneToSite;
const addMissionToSite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const siteId = req.params.siteId;
    try {
        const site = yield sites_model_1.default.findByIdAndUpdate(siteId, { $push: { missions: req.params.missionId } }, { new: true, lean: true });
        return res.status(200).json(site);
    }
    catch (err) {
        return res.status(404).json({ msg: "This site does not exist" });
    }
});
exports.addMissionToSite = addMissionToSite;
const getDrones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const siteId = req.params.siteId;
    console.log("🚀 ~ file: site.ts:75 ~ getDrones ~ siteId:", siteId);
    try {
        const site = yield sites_model_1.default.findById({ _id: siteId }).populate("drones", "drone_type name maker_name").select("-_id -missions -created_by");
        return res.status(200).json(site);
    }
    catch (err) {
        return res.status(404).json({ msg: "This site does not exist" });
    }
});
exports.getDrones = getDrones;
const getMissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const siteId = req.params.siteId;
    console.log("🚀 ~ file: site.ts:75 ~ getDrones ~ siteId:", siteId);
    try {
        const site = yield sites_model_1.default.findById({ _id: siteId }).populate("missions", "name alt").select("-_id -drones -created_by");
        return res.status(200).json(site);
    }
    catch (err) {
        return res.status(404).json({ msg: "This site does not exist" });
    }
});
exports.getMissions = getMissions;
