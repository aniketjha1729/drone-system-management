"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteRoute = void 0;
const express_1 = __importDefault(require("express"));
const site_1 = require("../controller/site");
const auth_1 = require("../middleware/auth");
exports.siteRoute = express_1.default.Router();
exports.siteRoute.get("/test", (req, res) => {
    res.status(200).json({
        Message: "Site Routes Working",
    });
});
exports.siteRoute.post("/", auth_1.isUserAuth, site_1.createSites);
exports.siteRoute.get("/", auth_1.isUserAuth, site_1.getAllSites);
exports.siteRoute.get("/:siteId", auth_1.isUserAuth, site_1.getSiteById);
exports.siteRoute.get("/:siteId/drones", auth_1.isUserAuth, site_1.getDrones);
exports.siteRoute.get("/:siteId/missions", auth_1.isUserAuth, site_1.getMissions);
exports.siteRoute.put("/:siteId", auth_1.isUserAuth, site_1.updateSite);
exports.siteRoute.delete("/:siteId", auth_1.isUserAuth, site_1.deleteSite);
exports.siteRoute.put("/:siteId/drone/:droneId", auth_1.isUserAuth, site_1.addDroneToSite);
exports.siteRoute.delete("/:siteId/drone/:droneId", auth_1.isUserAuth, site_1.deleteDrone);
exports.siteRoute.put("/:siteId/mission/:missionId", auth_1.isUserAuth, site_1.addMissionToSite);
exports.siteRoute.delete("/:siteId/mission/:missionId", auth_1.isUserAuth, site_1.deleteMission);
