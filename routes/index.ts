import express from "express";
import { userRoute } from "./user";
import { droneRoute } from "./drone";

export const routes = express.Router();

routes.use("/user", userRoute);
routes.use("/drone", droneRoute);
