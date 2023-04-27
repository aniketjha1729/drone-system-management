import express from "express";
import { createMission, getAllMissions } from "../controller/mission";
import { isUserAuth } from "../middleware/auth";
export const missionRoute = express.Router();

missionRoute.get("/test", (req, res) => {
  res.status(200).json({
    Message: "Mission Routes Working",
  });
});

missionRoute.post("/", isUserAuth, createMission);
missionRoute.get("/", isUserAuth, getAllMissions);
