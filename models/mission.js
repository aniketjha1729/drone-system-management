"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const missionSchema = new mongoose_1.Schema({
    alt: { type: Number, required: true },
    speed: { type: Number, required: true },
    name: { type: String, required: true },
    waypoints: [
        {
            alt: { type: Number, required: true },
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
        },
    ],
    site: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Site",
    },
}, { timestamps: true });
const Mission = (0, mongoose_1.model)("Mission", missionSchema);
exports.default = Mission;
