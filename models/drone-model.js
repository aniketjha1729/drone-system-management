"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const droneSchema = new mongoose_1.Schema({
    drone_type: { type: String, required: true },
    name: { type: String, required: true },
    maker_name: { type: String, required: true },
    created_by: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });
const Drone = (0, mongoose_1.model)("Drone", droneSchema);
exports.default = Drone;
