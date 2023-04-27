import express from "express";
import { droneRoute } from "./drone";
import { missionRoute } from "./mission";
import { siteRoute } from "./site";
import { userRoute } from "./user";

export const routes = express.Router();

routes.use("/user", userRoute);
routes.use("/drone", droneRoute);
routes.use("/site", siteRoute);
routes.use("/mission", missionRoute);
