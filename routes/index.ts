import express from "express";
import { userRoute } from "./user";

export const routes = express.Router();

routes.use(userRoute);
