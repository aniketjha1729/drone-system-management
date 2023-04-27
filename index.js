"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_2 = __importDefault(require("mongoose"));
const routes_1 = require("./routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
mongoose_2.default
    .connect(`${process.env.DATABASE}`)
    .then(() => console.log("Connected!"));
app.get("/test", (req, res) => {
    res.send("Express Server running....");
});
app.use(express_1.default.json());
app.use("/api", routes_1.routes);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
