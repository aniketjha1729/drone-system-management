import express from "express";
import {
  addDroneToSite,
  addMissionToSite,
  createSites,
  deleteDrone,
  deleteSite,
  getAllSites,
  getDrones,
  getMissions,
  getSiteById,
  updateSite,
} from "../controller/site";
import { isUserAuth } from "../middleware/auth";
export const siteRoute = express.Router();

siteRoute.get("/test", (req, res) => {
  res.status(200).json({
    Message: "Site Routes Working",
  });
});

siteRoute.post("/", isUserAuth, createSites);

siteRoute.get("/", isUserAuth, getAllSites);
siteRoute.get("/:siteId", isUserAuth, getSiteById);

siteRoute.get("/:siteId/drones", isUserAuth, getDrones);
siteRoute.get("/:siteId/missions", isUserAuth, getMissions);

siteRoute.put("/:siteId", isUserAuth, updateSite);
siteRoute.delete("/:siteId", isUserAuth, deleteSite);

siteRoute.put("/:siteId/drone/:droneId", isUserAuth, addDroneToSite);
siteRoute.delete("/:siteId/drone/:droneId", isUserAuth, deleteDrone);

siteRoute.put("/:siteId/mission/:missionId", isUserAuth, addMissionToSite);
siteRoute.delete("/:siteId/drone/:missionId", isUserAuth, deleteDrone);
