import express from "express";
export const userRoute = express.Router();

userRoute.get("/test", (req, res) => {
  res.status(200).json({
    Message: "User Routes Working",
  });
});

userRoute.post("/signin", (req, res) => {
  const { email, password } = req.body;
  res.send({ email: email, password: password });
});
