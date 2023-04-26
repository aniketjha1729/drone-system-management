import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { routes } from "./routes";
import { Application } from "express";
dotenv.config();

const app: Application = express();
const port = process.env.PORT;

mongoose
  .connect(`${process.env.DATABASE}`)
  .then(() => console.log("Connected!"));

app.get("/test", (req: Request, res: Response) => {
  res.send("Express Server running....");
});

app.use(express.json());
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
