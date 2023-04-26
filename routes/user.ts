import express, { Express, Request, Response } from "express";
export const userRoute = express.Router();

userRoute.get("/test", (req, res) => {
  res.status(200).json({
    Message: "User Routes Working",
  });
});
