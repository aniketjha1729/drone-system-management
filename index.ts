import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { routes } from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

mongoose
  .connect(`${process.env.DATABASE}`)
  .then(() => console.log("Connected!"));

app.get("/test", (req: Request, res: Response) => {
  res.send("Express Server running....");
});

app.use("/api/user", routes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
