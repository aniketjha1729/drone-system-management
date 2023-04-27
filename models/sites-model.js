"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const siteSchema = new mongoose_1.Schema({
    site_name: { type: String, required: true },
    position: {
        latitude: { type: String, required: true },
        longitude: { type: String, required: true },
    },
    created_by: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    drones: [
        { type: mongoose_1.Schema.Types.ObjectId, ref: "Drone" }
    ],
    missions: [
        { type: mongoose_1.Schema.Types.ObjectId, ref: "Mission" }
    ]
}, { timestamps: true });
const Site = (0, mongoose_1.model)("Site", siteSchema);
exports.default = Site;
