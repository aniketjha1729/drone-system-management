"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const siteSchema = new mongoose_1.Schema({
    color: { type: String, required: true },
    name: { type: String, required: true },
    tag_name: { type: String, required: true },
    maker_name: { type: String, required: true },
}, { timestamps: true });
const Site = (0, mongoose_1.model)("Site", siteSchema);
exports.default = Site;
