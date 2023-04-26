import express from "express";
import { createDrone, getAllDrones } from "../controller/drone";
import { isUserAuth } from "../middleware/auth";
export const droneRoute = express.Router();

droneRoute.get("/test", (req, res) => {
  res.status(200).json({
    Message: "Drone Routes Working",
  });
});

droneRoute.post("/createdrone", isUserAuth, createDrone);
droneRoute.get("/allDrones", isUserAuth, getAllDrones);
