import express from "express";
import { singUp } from "../controller/user";
export const userRoute = express.Router();

userRoute.get("/test", (req, res) => {
  res.status(200).json({
    Message: "User Routes Working",
  });
});

userRoute.post("/signup", singUp);
